import React, { ChangeEvent } from 'react'
import omit from 'lodash/omit'
import { Field } from 'formik'
import classnames from 'classnames'
import { createStyles, TextField, Typography, withStyles, WithStyles } from '@material-ui/core'
import { getAccountValue, getCurrencyAccount } from 'src/utils/journalHelpers'
import { ExchangeRate as ExchangeRateType } from 'src/redux/app/currency/types'
import { accountFrom, accounts, accountTo } from 'src/constants'
import InputLabel from 'src/components/common/InputLabel'
import { globalStyles } from 'src/styles/global-styles'
import ShowError from 'src/components/common/ShowError'
import { Company, InputDataValue } from 'src/redux/app/company/types'
import ExchangeRate from '../ExchangeRate'
import connector from './connector'

const styles = createStyles({
  root: {
    marginBottom: 20,
  },
  flexBetween: {
    ...globalStyles.flexBetween,
  },
  options: {
    ...globalStyles.flexBetween,
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    padding: '12px 36px',
    textOverflow: 'ellipsis',
    '-webkit-appearance': 'none',
    border: '1px solid #b6b9aa',
    '&:hover': {
      border: '1px solid transparent',
      boxShadow: '0 0 38px rgba(85,205,161,0.41)',
      '-webkit-box-shadow': '0 0 38px rgba(85,205,161,0.41)',
    },
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      margin: 0,
      display: 'none',
    },
  },
  smallPadding: {
    padding: '12px 20px',
    paddingRight: 46,
    textOverflow: 'ellipsis',
  },
  smallerPadding: {
    padding: 12,
    paddingRight: 46,
  },
  currency: {
    top: '30%',
    right: '8%',
    color: '#9e9e9e',
    position: 'absolute',
  },
  inputWithError: {
    marginBottom: 10,
  },
})

interface Props extends WithStyles<typeof styles> {
  inputLabel?: string,
  inputSum: number | null,
  company: Company | null,
  exchangeRate: ExchangeRateType | null,
  hasAdditionalNode?: boolean,
  additionalNode?: React.ReactNode,
  additionalInputNode?: React.ReactNode,
  actions: {
    changeSum: (value: number) => void,
    changeExchangeRate: (value: number | null) => void,
  },
  field: {
    name: string,
    value: number,
  },
  form: {
    submitCount: number,
    values: FormikValues,
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: number) => void,
  },
}

type FormikValues = {
  [key: string]: string,
}

class DialogInput extends React.PureComponent<Props> {
  public componentDidMount(): void {
    const { value } = this.props.field
    const { changeSum } = this.props.actions

    changeSum(value)
  }

  public handleChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = this.props.field
    const { changeSum } = this.props.actions
    const { setFieldValue } = this.props.form

    changeSum(+event.target.value)
    setFieldValue(name, +event.target.value)
  }

  public render() {
    const { classes, inputLabel, hasAdditionalNode, additionalNode, additionalInputNode, inputSum, field, form, company, ...props } = this.props
    const newProps = omit(props, ['inputSum', 'inputNewSum', 'inputExchangeRate', 'exchangeRate'])

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    const accountValue: InputDataValue | undefined = getAccountValue(company, form.values[accounts])
    const accountToValue: InputDataValue | undefined = getAccountValue(company, form.values[accountTo])
    const accountFromValue: InputDataValue | undefined = getAccountValue(company, form.values[accountFrom])

    const accountCurrency: string | null = getCurrencyAccount(accountValue)
    const accountToCurrency: string | null = getCurrencyAccount(accountToValue)
    const accountFromCurrency: string | null = getCurrencyAccount(accountFromValue)

    const hasAccounts = accountToValue && accountFromValue
    const accountsCurrencyDiffers = accountToCurrency !== accountFromCurrency
    const shouldRenderExchangeRate = hasAccounts && accountsCurrencyDiffers

    return (
      <div className={classes.root}>
        <div className={classes.options}>
          {inputLabel && <InputLabel inputLabel={inputLabel} />}

          {hasAdditionalNode && shouldRenderExchangeRate && (
            <Field
              type="number"
              name="exchangeRate"
              component={ExchangeRate}
            />
          )}

          {additionalNode}
        </div>

        <div className={classes.flexBetween}>
          <TextField
            {...newProps}
            {...field}
            value={inputSum ? inputSum : ''}
            onChange={this.handleChange}
            inputProps={{
              className: classnames(
                classes.input,
                {
                  [classes.smallPadding]: inputLabel,
                  [classes.smallerPadding]: hasAdditionalNode && shouldRenderExchangeRate,
                })
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                (accountFromValue || accountValue) &&
                <Typography className={classes.currency}>
                  {(accountFromValue && accountFromCurrency) || (accountValue && accountCurrency)}
                </Typography>),
            }}
            style={(isFormTouched && !!error) ? styles.inputWithError : undefined}
          />

          {shouldRenderExchangeRate && additionalInputNode}
        </div>

        <ShowError isFormTouched={isFormTouched} error={error} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(DialogInput))
