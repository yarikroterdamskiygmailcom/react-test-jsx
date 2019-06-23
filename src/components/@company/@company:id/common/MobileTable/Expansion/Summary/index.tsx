import React from 'react'
import classNames from 'classnames'
import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { accountWithBalance, getOperationTypeColor, operationType, outputConterpartyOrAccounts } from 'src/utils/table'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import { getBalance } from 'src/utils/getBalance'

const styles = (theme: Theme) => createStyles({
  root: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexBetween,
  },
  flexCenter: {
    ...globalStyles.flexCenter,
  },
  operationType: {
    marginTop: 1,
    [theme.breakpoints.down('xs')]: {},
  },
  counterparty: {
    ...globalStyles.flexCenter,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  accountBlock: {
    marginLeft: 20,
  },
  accountBalance: {
    display: 'flex',
    justifyContent: 'flex-end',
    '@media (max-width: 450px)': {
      flexDirection: 'column',
    },
  },
  gloomyBlock: {
    display: 'flex',
  },
  gloomy: {
    color: '#9c9c9c',
  },
  gloomyTop: {
    marginTop: 5,
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
  scheduled: {
    ...globalStyles.alignCenter,
    marginTop: 4,
    fontSize: 13,
    color: '#9c9c9c',
  },
})

interface Props extends WithStyles<typeof styles> {
  data: JournalAnalyticsData
}

const Summary = ({ classes, data }: Props) => {
  const { account, balances, accountFrom, balanceFrom } = accountWithBalance(data)

  return (
    <div className={classes.root}>
      <div className={classes.flexCenter}>
        <div className={classes.operationType}>
          {operationType(data.operationType, data.accountTo, data.accountFrom)}
        </div>

        <div className={classes.accountBlock}>
          <Typography component="div">{outputConterpartyOrAccounts(data, { classes })}</Typography>

          <div className={classes.gloomyBlock}>
            <Typography className={classNames(classes.gloomy, classes.gloomyTop)}>
              {data.date}
            </Typography>
            {!data.repeatable && data.scheduled && (
              <Typography className={classes.scheduled}>, плановая</Typography>)}
          </div>
        </div>
      </div>

      <div>
        <Typography
          align="right"
          style={{ color: getOperationTypeColor(data.operationType, data.accountTo, data.accountFrom) }}
        >
          {getBalance(data.sum)}
          &nbsp;{data.account ? data.account.account_currency!.symbol : data.accountFrom && data.accountFrom.account_currency!.symbol}
        </Typography>

        <div className={classes.gloomyTop}>
          <div className={classes.accountBalance}>
            <Typography className={classes.gloomy} align="right">
              {account && `${account}:`}
            </Typography>
            <Typography className={classes.gloomy} align="right">
              &nbsp;{getBalance(balances as number)}
              {data.account ? data.account.account_currency!.symbol : data.accountTo && data.accountTo.account_currency!.symbol}
            </Typography>
          </div>

          <div className={classes.accountBalance}>
            {accountFrom && (
              <>
                <Typography className={classes.gloomy} align="right">
                  {accountFrom && `${accountFrom}:`}
                </Typography>
                <Typography className={classes.gloomy} align="right">
                  &nbsp;{getBalance(balanceFrom as number)}
                  {data.accountFrom && data.accountFrom.account_currency!.symbol}
                </Typography>
              </>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Summary)
