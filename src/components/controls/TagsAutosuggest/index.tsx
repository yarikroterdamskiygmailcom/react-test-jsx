import React, { Component } from 'react'
import classNames from 'classnames'
import Creatable from 'react-select/lib/Creatable'
import {
  Chip,
  createStyles,
  MenuItem,
  Paper,
  Popper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core'
import { SelectComponents } from 'react-select/lib/components'
import { AutosuggestProps } from '../Autosuggest/types'
import { accounts as constAcconts, counterparties as constCounterparties, fontWeightBold } from 'src/constants'
import { FiltersData, FiltersDataKey, Value } from 'src/redux/app/types'
import InputLabel from 'src/components/common/InputLabel'
import ShowError from 'src/components/common/ShowError'
import { globalStyles } from 'src/styles/global-styles'
import { Company } from 'src/redux/app/company/types'
import { ValueType } from 'react-select/lib/types'
import CloseIcon from 'mdi-react/CloseIcon'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    ...globalStyles.fullWidth,
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    display: 'flex',
    position: 'relative',
    padding: '3px 10px',
    '-webkit-appearance': 'none',
    border: '1px solid #b6b9aa',
    '&:hover': {
      border: '1px solid transparent',
      boxShadow: '0 0 38px rgba(85,205,161,0.41)',
      '-webkit-box-shadow': '0 0 38px rgba(85,205,161,0.41)',
    },
  },
  chip: {
    height: 24,
    color: 'white',
    margin: '1px 5px 0 0',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 13,
  },
  popper: {
    zIndex: 9999,
    overflow: 'hidden',
  },
  paper: {
    margin: 0,
    padding: 0,
    borderRadius: 10,
    overflowY: 'hidden',
    boxShadow: 'none',
    background: 'white',
    border: '1px solid #E6E6E6',
  },
  errors: {
    marginTop: 10,
  },
})

let tags: null | undefined | Element | HTMLInputElement = null
let accounts: null | undefined | Element | HTMLInputElement = null
let counterparties: null | undefined | Element | HTMLInputElement = null

const smallSize = 13
const normalSize = 14

const inputComponent = ({ inputRef, ...props }: Partial<AutosuggestProps>) => (
  <div ref={inputRef} {...props} />
)

const Control = ({ selectProps, children, innerProps }: Partial<AutosuggestProps>) => (
  <TextField
    fullWidth={selectProps && selectProps.fullWidth}
    inputProps={{
      children,
      ...innerProps,
      className: selectProps && classNames(selectProps.classes.input, { [selectProps.classes.singleValue]: selectProps.small }),
      inputRef: (node: Element) => {
        if (selectProps) {
          if (selectProps.field.name === 'tags') tags = node
          if (selectProps.field.name === 'accounts') accounts = node
          if (selectProps.field.name === 'counterparties') counterparties = node
        }
      },
    }}
    InputProps={{
      inputComponent,
      disableUnderline: true,
    }}
  >
    {children}
  </TextField>
)

const Option = ({ innerRef, isFocused, isSelected, innerProps, children, selectProps }: Partial<AutosuggestProps>) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      maxHeight: 200,
      background: isFocused ? '#edf4fa' : undefined,
      fontWeight: isSelected ? fontWeightBold : undefined,
      fontSize: selectProps ? selectProps.small ? smallSize : normalSize : normalSize,
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
)

const MultiValue = ({ children, selectProps, removeProps, isFocused }: Partial<AutosuggestProps>) => {
  const iconSizeClose = 16
  const tabIndex = -1

  return (
    <Chip
      color="primary"
      label={children}
      tabIndex={tabIndex}
      className={selectProps && classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps && removeProps.onClick}
      deleteIcon={<CloseIcon color="white" size={iconSizeClose} {...removeProps} />}
    />
  )
}

const Menu = ({ selectProps, children, innerProps }: Partial<AutosuggestProps>) => {
  const popperNode = selectProps
    ? selectProps.field.name === 'tags' ? tags : (selectProps.field.name === constAcconts ? accounts : counterparties)
    : null

  return (
    <Popper
      open={Boolean(children)}
      className={selectProps && selectProps.classes.popper}
      anchorEl={popperNode}
    >
      <Paper
        className={selectProps && selectProps.classes.paper}
        style={{ width: popperNode ? popperNode.clientWidth : undefined }}
        {...innerProps}
      >
        {children}
      </Paper>
    </Popper>
  )
}

const components: Partial<SelectComponents<Value>> = {
  Menu,
  Option,
  Control,
  MultiValue,
}

interface Props extends WithStyles<typeof styles> {
  name: string,
  small?: boolean,
  disabled?: boolean,
  fullWidth?: boolean,
  submitForm?: boolean,
  placeholder: string,
  inputLabel?: string,
  filtersData: FiltersData | FiltersDataKey | null,
  company: Company | null | undefined,
  field: {
    name: string,
    value: ValueType<Value> | ValueType<Value>[],
  },
  form: {
    submitCount: number,
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: ValueType<Value> | ValueType<Value>[]) => void,
    submitForm: () => void,
  },
}

class ControlTagsAutosuggest extends Component<Props> {
  public handleChange = async (value: ValueType<Value> | ValueType<Value>[]) => {
    const { submitForm, form, field } = this.props
    await form.setFieldValue(field.name, value)

    if (submitForm) form.submitForm()
  }

  public formatCreateLabel = (small?: boolean) => (inputValue: string) => (
    <Typography variant="subtitle1" style={{ fontSize: small ? smallSize : normalSize }}>
      Создать "{inputValue}"
    </Typography>)

  public render(): React.ReactNode {
    const { classes, small, disabled, placeholder, fullWidth, company, filtersData, inputLabel, field, form } = this.props

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    const options = () => {
      if (field.name === constCounterparties && filtersData) return (filtersData as FiltersDataKey)[field.name]

      if (company && Object.values(company.inputs[field.name].data)) return Object.values(company.inputs[field.name].data)

      return undefined
    }

    return (
      <div className={classes.root}>
        {inputLabel && <InputLabel inputLabel={inputLabel} />}

        <Creatable
          value={field.value as Value}
          options={options() as Value[]}
          name={field.name}
          classes={classes}
          field={field}
          small={small}
          isMulti={!disabled}
          fullWidth={fullWidth}
          components={components}
          isSearchable={!disabled}
          placeholder={placeholder}
          onChange={this.handleChange}
          formatCreateLabel={this.formatCreateLabel(small)}
        />

        {isFormTouched && !!error && (
          <div className={classes.errors}>
            <ShowError isFormTouched={isFormTouched} error={error} />
          </div>)}
      </div>
    )
  }
}

export default withStyles(styles)(connector(ControlTagsAutosuggest))
