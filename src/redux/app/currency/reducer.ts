import { AnyAction } from 'redux'
import { CurrencyState } from './types'
import {
  CHANGE_EXCHANGE_RATE,
  CHANGE_NEW_SUM,
  CHANGE_SUM,
  GET_CURRENCIES_FULFILLED,
  GET_CURRENCIES_PENDING,
  GET_CURRENCIES_REJECTED,
  GET_EXCHANGE_RATES_FULFILLED,
  GET_EXCHANGE_RATES_PENDING,
  GET_EXCHANGE_RATES_REJECTED,
  RESET_INPUT,
} from './action'
import { setBalanceSum } from 'src/utils/getBalance'

const initialState: CurrencyState = {
  errors: {},
  isError: false,
  loading: false,
  exchangeRate: null,
  currencies: null,
  inputSum: null,
  inputNewSum: null,
  inputExchangeRate: null,
}

const currensyReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_CURRENCIES_PENDING:
    case GET_EXCHANGE_RATES_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case GET_CURRENCIES_REJECTED:
    case GET_EXCHANGE_RATES_REJECTED:
      return {
        ...state,
        loading: false,
        isError: true,
        errors: payload,
      }

    case GET_CURRENCIES_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        currencies: payload,
      }

    case GET_EXCHANGE_RATES_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        exchangeRate: payload,
      }

    case CHANGE_SUM:
      return {
        ...state,
        inputSum: payload,
        inputNewSum: setBalanceSum(state.inputExchangeRate ? (payload * state.inputExchangeRate) : null),
      }

    case CHANGE_NEW_SUM:
      return {
        ...state,
        inputNewSum: payload,
        inputSum: setBalanceSum(state.inputExchangeRate ? (payload / state.inputExchangeRate) : null),
      }

    case CHANGE_EXCHANGE_RATE:
      return {
        ...state,
        inputExchangeRate: payload,
        inputNewSum: setBalanceSum(state.inputSum ? (state.inputSum * payload) : null),
      }

    case RESET_INPUT:
      return {
        ...state,
        inputSum: null,
        inputNewSum: null,
        inputExchangeRate: null,
      }

    default:
      return state
  }
}

export default currensyReducer
