import React from 'react'
import AddIcon from 'mdi-react/AddIcon'
import RemoveIcon from 'mdi-react/RemoveIcon'
import AutorenewIcon from 'mdi-react/AutorenewIcon'
import ArrowForwardIcon from 'mdi-react/ArrowForwardIcon'
import { Typography, WithStyles } from '@material-ui/core'
import { externalToInternal, internalToExternal } from 'src/utils/journalHelpers'
import { InputDataValue } from 'src/redux/app/company/types'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { globalStyles } from 'src/styles/global-styles'
import { tableIconSize } from 'src/constants'

export const getTransferTypeColor = (accountTo?: InputDataValue | null, accountFrom?: InputDataValue | null) => {
  if (!(accountTo && accountFrom && accountTo.account_type && accountFrom.account_type)) {
    return ''
  }

  if (externalToInternal(accountTo.account_type.value, accountFrom.account_type.value)) return '#55cda1'
  if (internalToExternal(accountTo.account_type.value, accountFrom.account_type.value)) return '#ff7676'

  return ''
}

export const getOperationTypeColor = (types: string, accountTo?: InputDataValue | null, accountFrom?: InputDataValue | null) => {
  switch (types) {
    case 'income':
      return '#55cda1'
    case 'consumption':
      return '#ff7676'
    case 'transfer':
      return getTransferTypeColor(accountTo, accountFrom)

    default:
      return ''
  }
}

export const operationType = (types: string, accountTo?: InputDataValue | null, accountFrom?: InputDataValue | null) => {
  switch (types) {
    case 'income':
      return <AddIcon size={tableIconSize} color={getOperationTypeColor(types)} />
    case 'consumption':
      return <RemoveIcon size={tableIconSize} color={getOperationTypeColor(types)} />
    case 'transfer':
      return <AutorenewIcon size={tableIconSize} color={getOperationTypeColor(types, accountTo, accountFrom)} />

    default:
      return ''
  }
}

export const outputValueConterparty = (data: JournalAnalyticsData, style?: string) => {
  const { counterparty, counterpartyTo, counterpartyFrom, accountTo, accountFrom } = data
  if (counterparty) return counterparty.value

  if (accountTo && accountFrom && accountTo.account_type && accountFrom.account_type && (counterpartyTo || counterpartyFrom)) {
    if (internalToExternal(accountTo.account_type.value, accountFrom.account_type.value) && counterpartyTo) {
      return (
        <div style={globalStyles.flexCenter}>
          <ArrowForwardIcon size={tableIconSize} />
          &nbsp;
          <div className={style}>{counterpartyTo.value}</div>
        </div>
      )
    }
    if (externalToInternal(accountTo.account_type.value, accountFrom.account_type.value) && counterpartyFrom) {
      return (
        <div style={globalStyles.flexCenter}>
          <div className={style}>{counterpartyFrom.value}</div>
          &nbsp;
          <ArrowForwardIcon size={tableIconSize} />
        </div>
      )
    }
  }

  return <ArrowForwardIcon size={tableIconSize} />
}

export const outputConterpartyOrAccounts = (data: JournalAnalyticsData, { classes }: WithStyles) => {
  if (data.operationType === 'transfer') {
    const accountTo = data.accountTo ? data.accountTo.value : ''
    const accountFrom = data.accountFrom ? data.accountFrom.value : ''

    return (
      <div className={classes.counterparty}>
        <Typography>{accountTo}</Typography>
        <ArrowForwardIcon size={tableIconSize} className={classes.icon} />
        <Typography>{accountFrom}</Typography>
      </div>
    )
  }

  if (data.category) return data.category.value

  return ''
}

export const accountWithBalance = (data: JournalAnalyticsData) => {
  if (data.account) return { account: data.account.value, balances: data.account.balance }

  if (data.operationType === 'transfer') {
    if (data.accountTo && data.accountFrom) {
      return {
        account: data.accountTo.value,
        balances: data.accountTo.balance,
        accountFrom: data.accountFrom.value,
        balanceFrom: data.accountFrom.balance,
      }
    }
    if (data.accountTo) return { account: data.accountTo.value, balances: data.accountTo.balance }
    if (data.accountFrom) return { accountFrom: data.accountFrom.value, balanceFrom: data.accountFrom.balance }

    return { account: null, balances: null }
  }

  return { account: null, balances: null }
}
