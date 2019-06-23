import { isInteger, round } from 'lodash'
import { Accounts } from 'src/redux/app/company/types'

export const getBalance = (balanceValue: string | number | null) => {
  if (balanceValue === 0 || balanceValue === '0') {
    return 0
  }

  if (balanceValue) {
    if (!isInteger(+balanceValue)) {
      return round(+balanceValue, 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    return balanceValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return null
}

export const rates = (balanceValue: string | number | null) => {
  if (balanceValue === 0 || balanceValue === '0') {
    return 0
  }

  if (balanceValue) {
    if (!isInteger(balanceValue)) {
      return round(+balanceValue, 5)
    }
    return balanceValue
  }

  return null
}

export const setBalanceSum = (balanceValue: string | number | null) => {
  if (balanceValue === 0 || balanceValue === '0') {
    return 0
  }

  if (balanceValue) {
    if (!isInteger(balanceValue)) {
      return round(+balanceValue, 2)
    }
    return +balanceValue
  }

  return null
}

export const resultCapital = (accounts: Accounts) =>
  accounts.data
    .map(value => value.balance ? value.balance : 0)
    .reduce((sum: number, current: number) => sum + current)

export const resultInternal = (accounts: Accounts) =>
  accounts.data
    .map(value =>
      (value.account_type && value.balance) && value.account_type.value === 'Внутренний' ? value.balance : 0)
    .reduce((sum: number, current: number) => sum + current)

export const resultExternal = (accounts: Accounts) =>
  accounts.data
    .map(value =>
      (value.account_type && value.balance) && value.account_type.value === 'Внешний' ? value.balance : 0)
    .reduce((sum: number, current: number) => sum + current)
