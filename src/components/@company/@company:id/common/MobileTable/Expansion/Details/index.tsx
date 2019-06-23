import React, { PureComponent } from 'react'
import { Button, createStyles, Divider, Theme, withStyles, WithStyles } from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { accountWithBalance, getOperationTypeColor } from 'src/utils/table'
import { globalStyles } from 'src/styles/global-styles'
import { getBalance } from 'src/utils/getBalance'
import DetailsInfo from './DetailsInfo'

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '8px 36px 24px 56px',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px 24px 24px',
    },
  },
  fullWidth: {
    ...globalStyles.fullWidth,
  },
  buttonBlock: {
    ...globalStyles.fullWidth,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  button: {
    ...globalStyles.headerButton,
    width: 110,
    height: 35,
    fontSize: 15,
    background: '#f3f3f3',
    color: theme.palette.primary.dark,
    '&:hover': {
      transform: 'translateY(-3px)',
      background: 'white',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  data: JournalAnalyticsData,
  onRowChoose?: () => void,
}

class Details extends PureComponent<Props> {
  public accountDetailsInfo = (account?: string | null, accountFrom?: string | null) => {
    if (account && !accountFrom) return <DetailsInfo title="Счёт" infoValue={account} />
  }

  public projectInfo = (data: JournalAnalyticsData) => {
    if (data.project) {
      return (
        <DetailsInfo
          title="Проект"
          infoValue={data.project.value}
        />
      )
    }
  }

  public counterpartyInfo = (data: JournalAnalyticsData) => {
    if (data.counterparty) {
      return (
        <DetailsInfo
          title="Контрагент"
          infoValue={data.counterparty.value}
        />
      )
    }
  }

  public conterpartyToInfo = (data: JournalAnalyticsData) => {
    if (data.counterpartyTo && data.accountTo) {
      return (
        <DetailsInfo
          infoValue={data.counterpartyTo.value}
          title={`Контрагент (${data.accountTo.value})`}
        />
      )
    }
  }

  public conterpartyFromInfo = (data: JournalAnalyticsData) => {
    if (data.counterpartyFrom && data.accountFrom) {
      return (
        <DetailsInfo
          title={`Контрагент (${data.accountFrom.value})`}
          infoValue={data.counterpartyFrom.value}
        />
      )
    }
  }

  public accountInfo = (
    account?: string | null, balances?: number | null,
    symbol?: string | null) => {
    if (account) {
      return (
        <DetailsInfo
          title={`Остаток на счету "${account}"`}
          infoValue={balances ? `${getBalance(balances)} ${symbol}` : 0}
        />
      )
    }
  }

  public accountFromInfo = (
    accountFrom?: string | null, balanceFrom?: number | null,
    symbol?: string | null) => {
    if (accountFrom) {
      return (
        <DetailsInfo
          title={`Остаток на счету "${accountFrom}"`}
          infoValue={balanceFrom ? `${getBalance(balanceFrom)} ${symbol}` : 0}
        />
      )
    }
  }

  public render() {
    const { classes, data, onRowChoose } = this.props
    const { account, balances, accountFrom, balanceFrom } = accountWithBalance(data)

    const symbolAccountInfo = data.account
      ? data.account.account_currency!.symbol
      : (data.accountTo && data.accountTo.account_currency!.symbol)

    const sybolAccountFromInfo = data.accountFrom && data.accountFrom.account_currency!.symbol

    return (
      <div className={classes.fullWidth}>
        <Divider style={{ background: getOperationTypeColor(data.operationType, data.accountTo, data.accountFrom) }} />

        <div className={classes.root}>

          {this.accountDetailsInfo(account, accountFrom)}
          {this.counterpartyInfo(data)}
          {this.conterpartyToInfo(data)}
          {this.conterpartyFromInfo(data)}
          {this.projectInfo(data)}
          {this.accountInfo(account, balances, symbolAccountInfo)}
          {this.accountFromInfo(accountFrom, balanceFrom, sybolAccountFromInfo)}

          {!!onRowChoose && (
            <div className={classes.buttonBlock}>
              <Button className={classes.button} onClick={onRowChoose}>Изменить</Button>
            </div>)}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
