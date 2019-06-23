import { AnyAction } from 'redux'
import moment from 'moment'
import { ReceivablesState } from './types'
import { JournalAnalyticsData } from '../../types'
import {
  CHOOSE_COUNTERPARTY,
  GET_RECEIVABLES_DATA_FULFILLED,
  GET_RECEIVABLES_DATA_PENDING,
  GET_RECEIVABLES_DATA_REJECTED,
  REMOVE_COUNTERPARTY,
  REMOVE_RECEIVABLES_DATA,
} from './action'

const initialState: ReceivablesState = {
  isError: false,
  errors: {},
  total: 0,
  loading: false,
  receivablesData: null,
  chosenCounterparty: null,
}

const receivablesReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_RECEIVABLES_DATA_PENDING:
      return {
        ...state,
        isError: false,
        errors: {},
        loading: true,
      }

    case GET_RECEIVABLES_DATA_FULFILLED:
      return {
        ...state,
        isError: false,
        errors: {},
        loading: false,
        total: payload.data.length,
        receivablesData: payload.data.map((value: JournalAnalyticsData) => ({
          ...value,
          date: moment(value.date).format('DD.MM.YYYY'),
        })),
      }

    case GET_RECEIVABLES_DATA_REJECTED:
      return {
        ...state,
        isError: true,
        errors: payload,
        loading: false,
      }

    case REMOVE_RECEIVABLES_DATA:
      return {
        ...state,
        isError: false,
        errors: {},
        loading: false,
        receivablesData: null,
      }

    case CHOOSE_COUNTERPARTY:
      return {
        ...state,
        chosenCounterparty: payload
      }

    case REMOVE_COUNTERPARTY:
      return {
        ...state,
        chosenCounterparty: null,
      }

    default:
      return state
  }
}

export default receivablesReducer
