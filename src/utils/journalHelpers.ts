import { Company, InputDataValue, InputValue } from 'src/redux/app/company/types'
import { ExchangeRate } from 'src/redux/app/currency/types'
import { SchedulePeriods } from 'src/redux/app/ui/secondaryData/types'

const defaultIndex = -1
const accounts = 'accounts'

export const internalToExternal = (accountTo: string, accountFrom: string) =>
  accountTo === 'Внешний' && accountFrom === 'Внутренний'

export const externalToInternal = (accountTo: string, accountFrom: string) =>
  accountTo === 'Внутренний' && accountFrom === 'Внешний'

export const getAccountValue = (company: Company | null, formValue: string, inputValue?: string) => company
  ? company.inputs[inputValue || accounts].data.find((value: InputDataValue) => value.value === formValue)
  : undefined

export const getCurrencyAccount = (accountValue: InputDataValue | undefined) => accountValue
  ? accountValue.account_currency!.code
  : null

type Form = {
  values: {
    [key: string]: string,
  },
}

export const getRates = (company: Company | null, exchangeRate: ExchangeRate | null, form: Form) => {
  const accountTo = 'accountTo'
  const accountFrom = 'accountFrom'

  const accountToValue: InputDataValue | undefined = getAccountValue(company, form.values[accountTo])
  const accountFromValue: InputDataValue | undefined = getAccountValue(company, form.values[accountFrom])

  const currencyAccountTo: string | null = getCurrencyAccount(accountToValue)
  const currencyAccountFrom: string | null = getCurrencyAccount(accountFromValue)

  return getExchangeRates(company, exchangeRate, currencyAccountFrom as string, currencyAccountTo as string)
}

export const getExchangeRates =
  (company: Company | null, exchangeRate: ExchangeRate | null, currencyAccountFrom: string, currencyAccountTo: string) =>
    company && exchangeRate &&
    exchangeRate[currencyAccountFrom] &&
    exchangeRate[currencyAccountFrom].rates[currencyAccountTo]

export const getAccountType = (accountValue: InputDataValue | undefined) => accountValue
  ? accountValue.account_type!.value
  : null

export const isInternalAccount = (account?: InputValue | null): boolean => account ?
  account.value === 'Внутренний'
  : false

export const isExternalAccount = (account?: InputValue | null): boolean => account ?
  account.value === 'Внешний'
  : false

export const isExternalAccountType = (accoundType: string | boolean | null): boolean => accoundType ?
  accoundType === 'Внешний'
  : false

export const getIndexPeriods = (schedulePeriods: [SchedulePeriods] | null, formValue: string) => schedulePeriods
  ? schedulePeriods.findIndex((value: SchedulePeriods) => value.value === formValue)
  : defaultIndex

export const getPeriodsValue = (schedulePeriods: [SchedulePeriods] | null, indexPeriod: number) => schedulePeriods &&
indexPeriod >= 0
  ? schedulePeriods[indexPeriod]
  : null
