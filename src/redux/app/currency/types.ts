import { Currency } from 'src/components/@company/@choose/types'

export type CurrencyState = {
  errors: object,
  isError: boolean,
  loading: boolean,
  exchangeRate: ExchangeRate | null,
  currencies: [Currency] | null,
  inputSum: number | null,
  inputNewSum: number | null,
  inputExchangeRate: number | null,
}

export type ExchangeRate = {
  [key: string]: ExchangeRateValue,
}

export type ExchangeRateValue = {
  _id: string,
  name: string,
  name_russian: string,
  value: string,
  label: string,
  symbol: string,
  code: string,
  rates: Rates,
}

export type Rates = {
  [key: string]: number,
}
