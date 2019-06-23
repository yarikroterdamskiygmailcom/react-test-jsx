import React, { Component, FormEvent } from 'react'
import classnames from 'classnames'
import omit from 'lodash/omit'
import Autosuggest from 'react-autosuggest'
import { createStyles, MenuItem, Paper, Popper, TextField, Typography, WithStyles, withStyles } from '@material-ui/core'
import {
  account,
  accountFrom,
  accounts,
  accountTo,
  consumption,
  consumptionCategory,
  counterparty,
  counterpartyFrom,
  counterpartyTo,
  fontWeightBold,
  income,
  incomeCategory,
  projects,
  projectsTransfer,
} from 'src/constants'
import { getAccountType, getAccountValue, isExternalAccountType } from 'src/utils/journalHelpers'
import { Change, Fetch, Options, Part, RenderSuggestion, Suggestion } from './types'
import { Accounts, Company, InputDataValue } from 'src/redux/app/company/types'
import { SchedulePeriods } from 'src/redux/app/ui/secondaryData/types'
import InputLabel from 'src/components/common/InputLabel'
import ShowError from 'src/components/common/ShowError'
import { globalStyles } from 'src/styles/global-styles'
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import connector from './connector'

const styles = () => createStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    marginBottom: 15,
    ...globalStyles.alignCenter,
  },
  rootNone: {
    display: 'none',
  },
  smallRoot: {
    marginBottom: 0,
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    width: '100%',
    position: 'relative',
    textOverflow: 'ellipsis',
    padding: '12px 25px 12px 20px',
    '-webkit-appearance': 'none',
    border: '1px solid #b6b9aa',
    '&:hover': {
      border: '1px solid transparent',
      boxShadow: '0 0 38px rgba(85,205,161,0.41)',
      '-webkit-box-shadow': '0 0 38px rgba(85,205,161,0.41)',
    },
  },
  disabledInput: {
    '&:hover': {
      boxShadow: 'none',
      '-webkit-box-shadow': 'none',
      '-webkit-appearance': 'none',
      border: '1px solid #b6b9aa',
    },
  },
  smallPadding: {
    padding: '6px 20px 6px 10px',
    fontSize: 13,
  },
  popper: {
    zIndex: 9999,
  },
  paper: {
    maxHeight: 200,
    borderRadius: 10,
    overflowY: 'auto',
    boxShadow: 'none',
    background: 'white',
    border: '1px solid #E6E6E6',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: 8,
    zIndex: 1,
    right: 0,
    left: 0,
  },
  suggestion: {
    display: 'block',
  },
  smallSuggestion: {
    fontSize: 13,
  },
  inputBottom: {
    marginBottom: 10,
  },
  inputBottomNone: {
    marginBottom: 0,
  },
  icon: {
    top: '25%',
    right: '2%',
    position: 'absolute',
  },
  iconSmall: {
    top: '10%',
  },
})

interface Props extends WithStyles<typeof styles> {
  small?: boolean,
  inputLabel?: string,
  company: Company | null,
  getSchedulePeriods: [SchedulePeriods] | null,
  isRepeatDisabled: boolean,
  field: {
    name: string,
    value: string,
  },
  form: {
    submitCount: number,
    values: {
      [key: string]: string,
    },
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: string) => void,
  } | any,
  inputRef: (node: Element) => void,
  ref: (node: Element) => void,
}

interface State {
  value: string,
  suggestions: InputDataValue[] | Suggestion[] | SchedulePeriods[] | [],
}

let smaller: boolean | undefined = false

const renderInputComponent = ({ classes, small, isRepeatDisabled, inputRef = () => {}, ref, inputLabel, ...other }: Partial<Props>) => (
  <TextField
    {...other}
    disabled={isRepeatDisabled}
    inputProps={{
      className: classes && classnames(
        classes.input,
        {
          [classes.smallPadding]: small,
          [classes.disabledInput]: isRepeatDisabled,
        },
      )
    }}
    InputProps={{
      inputRef: (node: Element) => {
        if (ref) ref(node)
        if (inputRef) inputRef(node)
      },
      disableUnderline: true,
      endAdornment: (
        <ExpandMoreIcon
          color="#b2b2b2"
          className={classnames(classes && ({ [classes.icon]: classes, [classes.iconSmall]: (small && classes) }))}
        />),
    }}
  />
)

const getSuggestions = (data: InputDataValue[] | SchedulePeriods[] | null | undefined, value: string) => {
  interface Data extends InputDataValue, SchedulePeriods {}

  const inputValue = value.trim().toLowerCase()

  return inputValue.length
    ? data &&
    (data as Data[])
      .filter((suggestion: object) => Object.values(suggestion).join(' ').toLowerCase().includes(inputValue))
    : data
}

const getSuggestionValue = (suggestion: Suggestion) => suggestion.label

const shouldRenderSuggestions = () => true

const renderSuggestion = (suggestion: Suggestion, { query, isHighlighted }: RenderSuggestion) => {
  const fontSizeSmall = 13
  const fontSizeNormal = 15

  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div" style={{ background: isHighlighted ? '#edf4fa' : undefined }}>
      {parts.map((part: Part, index: number) => (
        <Typography
          key={index}
          variant="subtitle1"
          style={{
            fontWeight: part.highlight ? fontWeightBold : undefined,
            fontSize: smaller ? fontSizeSmall : fontSizeNormal,
          }}
        >
          {part.text}
        </Typography>
      ))}
    </MenuItem>
  )
}

class ControlAutosuggest extends Component<Props, State> {
  public popperNode: null | undefined | HTMLInputElement = null

  constructor(props: Props) {
    super(props)

    this.state = {
      value: props.field.value || '',
      suggestions: []
    }
  }

  public onChange = (event: FormEvent<HTMLInputElement>, { newValue }: Change) => {
    const { setFieldValue } = this.props.form
    const { name } = this.props.field

    this.setState({
      value: newValue || event.currentTarget.value,
    })

    setFieldValue(name, newValue)
  }

  public handleSuggestionsFetchRequested =
    (data: Accounts | null | undefined, schedulePeriods: SchedulePeriods[] | null | undefined) =>
      ({ value }: Fetch) => {
        this.setState({
          suggestions: getSuggestions(data ? data.data : schedulePeriods, value)!,
        })
      }

  public handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  public render() {
    const { classes, small, inputLabel, form, field, company, getSchedulePeriods } = this.props
    const { value, suggestions } = this.state

    const newProps = omit(this.props, 'getSchedulePeriods')

    smaller = small

    let inputLabelWithContragent: string = inputLabel ? inputLabel : ''

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    const accountToValue: InputDataValue | undefined = getAccountValue(company, form.values[accountTo])
    const accountFromValue: InputDataValue | undefined = getAccountValue(company, form.values[accountFrom])

    const counterpartyToType: string | null = getAccountType(accountToValue)
    const counterpartyFromType: string | null = getAccountType(accountFromValue)

    const isConterpartyTo: boolean = isExternalAccountType(counterpartyToType)
    const isConterpartyFrom: boolean = isExternalAccountType(counterpartyFromType)

    const isShowConterpartyTo = !isConterpartyTo && field.name === counterpartyTo
    const isShowConterpartyFrom = !isConterpartyFrom && field.name === counterpartyFrom

    const isShowIncomeCategory = !(!isConterpartyTo && isConterpartyFrom)
    const isShowConsumptionCategory = !(isConterpartyTo && !isConterpartyFrom)

    const isShowProject = isShowIncomeCategory && isShowConsumptionCategory

    if (isConterpartyTo && field.name === counterpartyTo) {
      inputLabelWithContragent = `${inputLabel} (${form.values[accountTo]})`
    }
    if (isConterpartyFrom && field.name === counterpartyFrom) {
      inputLabelWithContragent = `${inputLabel} (${form.values[accountFrom]})`
    }

    const getDataForAutosuggest = () => {
      if (company) {
        if (field.name === account || field.name === accountFrom || field.name === accountTo) return company.inputs[accounts]

        if (field.name === counterpartyTo || field.name === counterpartyFrom) return company.inputs[counterparty]

        if (field.name === incomeCategory) return company.inputs[income]

        if (field.name === consumptionCategory) return company.inputs[consumption]

        if (field.name === projectsTransfer) return company.inputs[projects]

        return company.inputs[field.name]
      }
    }

    const getSchedulePeriodsValue = () => {
      if (field.name === 'repeatMonth') return getSchedulePeriods
    }

    const inputProps = {
      value,
      ...newProps,
      inputRef: (node: null | undefined | HTMLInputElement) => {
        this.popperNode = node
      },
      onChange: this.onChange,
    }

    const autosuggestProps = {
      suggestions,
      renderSuggestion,
      getSuggestionValue,
      renderInputComponent,
      shouldRenderSuggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested(
        getDataForAutosuggest(), getSchedulePeriodsValue()),
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
    }

    return (
      <div
        className={classnames(
          classes.root,
          {
            [classes.smallRoot]: small,
            [classes.rootNone]: (
              isShowConterpartyTo ||
              isShowConterpartyFrom ||
              (isShowProject && field.name === projectsTransfer) ||
              (isShowIncomeCategory && field.name === incomeCategory) ||
              (isShowConsumptionCategory && field.name === consumptionCategory)
            )
          },
        )}
      >
        {inputLabel && <InputLabel inputLabel={inputLabelWithContragent} />}

        <Autosuggest
          {...autosuggestProps}
          inputProps={inputProps}
          theme={{
            suggestion: classes.suggestion,
            suggestionsList: classes.suggestionsList,
            sectionTitle: classnames({ [classes.smallSuggestion]: small }),
            input: classnames((small && !error) ? classes.inputBottomNone : classes.inputBottom)
          }}
          renderSuggestionsContainer={(options: Options) => (
            <Popper
              className={classes.popper}
              anchorEl={this.popperNode}
              open={Boolean(options.children)}
            >
              <Paper
                {...options.containerProps}
                className={classes.paper}
                style={{ width: this.popperNode ? this.popperNode.clientWidth : undefined }}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        />

        <ShowError small={small} isFormTouched={isFormTouched} error={error} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(ControlAutosuggest))
