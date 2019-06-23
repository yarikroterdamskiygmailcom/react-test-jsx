import { AnyAction } from 'redux'
import { PaymentState } from './types'
import {
  CHANGE_TARIFF_PENDING,
  CHANGE_TARIFF_REJECTED,
  SUBSCRIBE_FULFILLED,
  SUBSCRIBE_PENDING,
  SUBSCRIBE_REJECTED,
  UNSUBSCRIBE_PENDING,
  UNSUBSCRIBE_REJECTED,
} from './action'

const initialState: PaymentState = {
  errors: {},
  isError: false,
  loading: false,
  payment: null,
}

const paymentReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SUBSCRIBE_PENDING:
    case UNSUBSCRIBE_PENDING:
    case CHANGE_TARIFF_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case SUBSCRIBE_REJECTED:
    case UNSUBSCRIBE_REJECTED:
    case CHANGE_TARIFF_REJECTED:
      return {
        ...state,
        loading: false,
        isError: true,
        errors: payload,
      }

    case SUBSCRIBE_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        payment: payload,
      }

    default:
      return state
  }
}

export default paymentReducer
