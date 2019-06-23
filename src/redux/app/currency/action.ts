import Currency from 'src/api/Currency'

export const GET_CURRENCIES = 'GET_CURRENCIES'
export const GET_CURRENCIES_PENDING = 'GET_CURRENCIES_PENDING'
export const GET_CURRENCIES_FULFILLED = 'GET_CURRENCIES_FULFILLED'
export const GET_CURRENCIES_REJECTED = 'GET_CURRENCIES_REJECTED'

export const GET_EXCHANGE_RATES = 'GET_EXCHANGE_RATES'
export const GET_EXCHANGE_RATES_PENDING = 'GET_EXCHANGE_RATES_PENDING'
export const GET_EXCHANGE_RATES_FULFILLED = 'GET_EXCHANGE_RATES_FULFILLED'
export const GET_EXCHANGE_RATES_REJECTED = 'GET_EXCHANGE_RATES_REJECTED'

export const CHANGE_SUM = 'CHANGE_SUM'
export const CHANGE_NEW_SUM = 'CHANGE_NEW_SUM'
export const CHANGE_EXCHANGE_RATE = 'CHANGE_EXCHANGE_RATE'
export const RESET_INPUT = 'RESET_INPUT'

const getCurrencies = () => ({
  type: GET_CURRENCIES,
  payload: Currency.getCurrencies(),
})

const getExchangeRates = () => ({
  type: GET_EXCHANGE_RATES,
  payload: Currency.getExchangeRates(),
})

const changeSum = (value: number) => ({
  type: CHANGE_SUM,
  payload: value,
})

const changeNewSum = (value: number) => ({
  type: CHANGE_NEW_SUM,
  payload: value,
})

const changeExchangeRate = (value: number | null) => ({
  type: CHANGE_EXCHANGE_RATE,
  payload: value,
})

const resetInputSum = () => ({
  type: RESET_INPUT,
})

export default {
  getCurrencies,
  getExchangeRates,
  changeSum,
  changeNewSum,
  changeExchangeRate,
  resetInputSum,
}
