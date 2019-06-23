import React, { ChangeEvent, Component } from 'react'
import { createStyles, TextField, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { ExchangeRate } from 'src/redux/app/currency/types'
import { globalStyles } from 'src/styles/global-styles'
import { Company } from 'src/redux/app/company/types'
import AutorenewIcon from 'mdi-react/AutorenewIcon'
import { iconSize } from 'src/constants'
import connector from './connector'
import { rates } from 'src/utils/getBalance'
import { getRates } from 'src/utils/journalHelpers'

const styles = (theme: Theme) => createStyles({
  root: {
    minWidth: 120,
    maxWidth: 150,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  input: {
    ...globalStyles.input,
    ...globalStyles.alignCenter,
    color: 'white',
    paddingTop: 6,
    paddingBottom: 2,
    paddingLeft: 52,
    paddingRight: 30,
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: '#57de8b',
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
  title: {
    top: '8%',
    left: '8%',
    color: 'white',
    fontSize: 14,
    position: 'absolute',
  },
  exchangeRate: {
    fontSize: 14,
    paddingRight: 5,
    fontWeight: 'bold',
  },
  icon: {
    top: '8%',
    right: '8%',
    position: 'absolute',
    cursor: 'pointer',
  },
})

interface Props extends WithStyles<typeof styles> {
  exchangeRate: ExchangeRate | null,
  company: Company | null,
  inputExchangeRate: number | null,
  actions: {
    changeExchangeRate: (value: number | null) => void,
  },
  field: {
    name: string,
    value: string | number,
  },
  form: {
    submitCount: number,
    values: {
      [key: string]: string,
    },
    errors: {
      [key: string]: string,
    },
    setFieldValue: (name: string, value: number) => void,
  },
}

class Rate extends Component<Props> {
  public componentDidMount(): void {
    const { value } = this.props.field
    const { changeExchangeRate } = this.props.actions
    const { company, exchangeRate, form } = this.props

    const getAccountExhangeRate = rates(getRates(company, exchangeRate, form))

    changeExchangeRate(+value || (getAccountExhangeRate ? +getAccountExhangeRate : null))
  }

  public handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = this.props.field
    const { changeExchangeRate } = this.props.actions
    const { setFieldValue } = this.props.form

    setFieldValue(name, +event.target.value)
    changeExchangeRate(+event.target.value)
  }

  public EndAdornment = () => <AutorenewIcon color="white" size={iconSize} className={this.props.classes.icon} />

  public StartAdornment = () => (
    <Typography variant="subtitle1" color="inherit" className={this.props.classes.title}>Курс</Typography>)

  public render() {
    const { classes, exchangeRate, company, form, inputExchangeRate, field, ...props } = this.props

    return (
      <div className={classes.root}>
        <TextField
          {...props}
          {...field}
          fullWidth
          value={inputExchangeRate ? inputExchangeRate : field.value}
          onChange={this.handleChange}
          inputProps={{ className: classes.input }}
          InputProps={{
            disableUnderline: true,
            startAdornment: this.StartAdornment(),
            endAdornment: this.EndAdornment(),
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(connector(Rate))
