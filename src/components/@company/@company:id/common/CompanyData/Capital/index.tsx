import React, { Component } from 'react'
import classNames from 'classnames'
import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'
import { Accounts, Company, InputDataValue } from 'src/redux/app/company/types'
import { getBalance, resultCapital } from 'src/utils/getBalance'
import { globalStyles } from 'src/styles/global-styles'
import Internal from './InternalAccounts'
import External from './ExternalAccounts'
import connector from './connector'
import Learning from './Learning'

const styles = createStyles({
  root: {
    ...globalStyles.fullWidth,
  },
  result: {
    height: 50,
    paddingLeft: 25,
    paddingRight: 15,
    background: '#ecf5fa',
    ...globalStyles.flexBetween,
  },
  capital: {
    fontSize: 13,
    color: '#2b2b2b',
    fontWeight: 'bold',
    ...globalStyles.alignCenter,
  },
  capitalRed: {
    color: '#ff7676',
  },
})

interface Props extends WithStyles<typeof styles> {
  company: Company | null,
  companyAccounts: Accounts | null,
  actions: {
    chooseFund: (value: InputDataValue) => void,
  }
}

class CompanyData extends Component<Props> {
  public handleClick = (value: InputDataValue) => () => {
    const { chooseFund } = this.props.actions
    chooseFund(value)
  }

  public render() {
    const { classes, company, companyAccounts } = this.props

    if (!company || !companyAccounts) return null

    return (
      <div className={classes.root}>
        <div className={classes.result}>
          <Typography variant="subtitle1" className={classes.capital}>Капитал:</Typography>
          <Typography
            variant="subtitle1"
            className={classNames(classes.capital, { [classes.capitalRed]: resultCapital(companyAccounts) < 0 })}
          >
            {getBalance(resultCapital(companyAccounts))} $
          </Typography>
        </div>

        <Internal accounts={companyAccounts} onClick={this.handleClick} />
        <External accounts={companyAccounts} onClick={this.handleClick} />

        <Learning />
      </div>
    )

  }
}

export default withStyles(styles)(connector(CompanyData))
