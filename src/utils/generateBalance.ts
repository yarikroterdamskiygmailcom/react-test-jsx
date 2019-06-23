import { Accounts } from 'src/redux/app/company/types'

const generateBalance = (accounts: Accounts | null) => {
  const activeBalance = accounts && accounts.data!
    .filter(el => el.account_type!.value === 'Внутренний' ||
      el.account_type!.value === 'Внешний' &&
      el.balance! > 0
    )
    .reduce((acc, el) => {
      acc += el.balance!
      return acc
    },      0)

  const debitValues = accounts && accounts.data!
    .filter(el => el.account_type!.value === 'Внешний' && el.balance! > 0)

  const moneyValues = accounts && accounts.data!
    .filter(el => el.account_type!.value === 'Внутренний')

  const creditValues = accounts && accounts.data!
    .filter(el => el.account_type!.value === 'Внешний' && el.balance! < 0)

  const selfCapital = accounts && accounts.data!
    .map(value => value.balance!)
    .reduce((acc, val) => acc + val)

  return { activeBalance, debitValues, moneyValues, creditValues, selfCapital }
}

export default generateBalance
