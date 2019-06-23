import React, { ChangeEvent } from 'react'
import omit from 'lodash/omit'
import { createStyles, TextField, Typography, withStyles, WithStyles } from '@material-ui/core'
import { accountTo } from 'src/constants'
import { globalStyles } from 'src/styles/global-styles'
import ShowError from 'src/components/common/ShowError'
import { ExchangeRate } from 'src/redux/app/currency/types'
import { Company, InputDataValue } from 'src/redux/app/company/types'
import { getAccountValue, getCurrencyAccount } from 'src/utils/journalHelpers'
import connector from './connector'

const styles = createStyles({
  root: {
    paddingLeft: 10,
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    color: 'white',
    padding: 12,
    paddingRight: 46,
    backgroundColor: '#919191',
    border: '1px solid #b6b9aa',
    '-webkit-appearance': 'none',
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
  currency: {
    top: '30%',
    right: '10%',
    color: 'white',
    position: 'absolute',
  },
  inputWithError: {
    marginBottom: 10,
  },
})

interface Props extends WithStyles<typeof styles> {
  exchangeRate: ExchangeRate | null,
  company: Company | null,
  inputSum: number | null,
  inputNewSum: number | null,
  inputExchangeRate: number | null,
  actions: {
    changeNewSum: (value: number) => void,
    changeExchangeRate: (value: number | null) => void,
  },
  field: {
    name: string,
    value: string | number,
  },
  form: {
    submitCount: number,
    values: {
      [key: string]: string | number,
    },
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: number) => void,
  },
}

const EndAdorment = (accountToValue: InputDataValue | undefined, currencyAccountFrom: string | boolean | null, style: string) =>
  accountToValue && (
    <Typography className={style}>
      {currencyAccountFrom}
    </Typography>)

class ExchangeRateInput extends React.PureComponent<Props> {
  public componentDidMount(): void {
    const { value } = this.props.field
    const { changeNewSum } = this.props.actions

    changeNewSum(+value)
  }

  public handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = this.props.field
    const { changeNewSum } = this.props.actions
    const { setFieldValue } = this.props.form

    setFieldValue(name, +event.target.value)
    changeNewSum(+event.target.value)
  }

  public render() {
    const { classes, field, form, exchangeRate, company, inputNewSum, ...props } = this.props
    const newProps = omit(props, ['inputSum', 'inputNewSum', 'inputExchangeRate', 'exchangeRate'])

    const isFormTouched = form.submitCount > 0
    const error = form.errors[field.name]

    const accountToValue: InputDataValue | undefined = getAccountValue(company, form.values[accountTo] as string)
    const currencyAccountTo: string | null = getCurrencyAccount(accountToValue)

    return (
      <div className={classes.root}>
        <TextField
          {...newProps}
          {...field}
          onChange={this.handleChange}
          value={inputNewSum ? inputNewSum : ''}
          inputProps={{ className: classes.input }}
          InputProps={{
            disableUnderline: true,
            endAdornment: EndAdorment(accountToValue, currencyAccountTo, classes.currency),
          }}
          style={(isFormTouched && !!error) ? styles.inputWithError : undefined}
        />

        <ShowError isFormTouched={isFormTouched} error={error} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(ExchangeRateInput))
