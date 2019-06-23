import React from 'react'
import omit from 'lodash/omit'
import classnames from 'classnames'
import theme from 'src/styles/theme'
import { createStyles, TextField, withStyles, WithStyles } from '@material-ui/core'
import { getAccountValue, getCurrencyAccount } from 'src/utils/journalHelpers'
import { ExchangeRate as ExchangeRateType } from 'src/redux/app/currency/types'
import { accountFrom, accountTo } from 'src/constants'
import InputLabel from 'src/components/common/InputLabel'
import { globalStyles } from 'src/styles/global-styles'
import ShowError from 'src/components/common/ShowError'
import { Company, InputDataValue } from 'src/redux/app/company/types'
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
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
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
    value: string,
  },
  form: {
    submitCount: number,
    values: FormikValues,
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: string | number) => void,
  },
}

type FormikValues = {
  [key: string]: string,
}

const DialogInput = ({ classes, inputLabel, additionalNode, additionalInputNode, inputSum, field, form, company, ...props }: Props) => {
  const newProps = omit(props, ['inputSum', 'inputNewSum', 'inputExchangeRate', 'exchangeRate'])

  const isFormTouched = form.submitCount > 0
  const error = form.errors[field.name]

  const accountToIndex: InputDataValue | undefined = getAccountValue(company, form.values[accountTo])
  const accountFromIndex: InputDataValue | undefined = getAccountValue(company, form.values[accountFrom])

  const accountToCurrency: string | null = getCurrencyAccount(accountToIndex)
  const accountFromCurrency: string | null = getCurrencyAccount(accountFromIndex)

  const hasAccounts = accountToIndex && accountFromIndex
  const accountsCurrencyDiffers = accountToCurrency !== accountFromCurrency
  const shouldRenderExchangeRate = hasAccounts && accountsCurrencyDiffers

  return (
    <div className={classes.root}>
      <div className={classes.options}>
        {inputLabel && <InputLabel inputLabel={inputLabel} />}

        {additionalNode}
      </div>

      <div className={classes.flexBetween}>
        <TextField
          {...newProps}
          {...field}
          value={field.value}
          inputProps={{
            className: classnames([
              classes.input,
              inputLabel && classes.smallPadding])
          }}
          InputProps={{ disableUnderline: true }}
          style={(isFormTouched && !!error) ? styles.inputWithError : undefined}
        />

        {shouldRenderExchangeRate && additionalInputNode}
      </div>

      <ShowError isFormTouched={isFormTouched} error={error} />
    </div>
  )
}

export default withStyles(styles)(connector(DialogInput))
