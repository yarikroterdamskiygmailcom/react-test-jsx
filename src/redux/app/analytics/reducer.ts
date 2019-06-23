import { AnyAction } from 'redux'
import moment from 'moment'
import arrayToObject from 'src/utils/arrayToObject'
import { JournalAnalyticsData } from '../types'
import { AnalyticsState } from './types'
import {
  CHOOSE_ANALYTICS_DATA,
  DELETE_TRANSACTION_ANALYTICS_FULFILLED,
  DELETE_TRANSACTION_ANALYTICS_PENDING,
  DELETE_TRANSACTION_ANALYTICS_REJECTED,
  GET_ANALYTICS_DATA_FULFILLED,
  GET_ANALYTICS_DATA_PAGINATED_FULFILLED,
  GET_ANALYTICS_DATA_PAGINATED_PENDING,
  GET_ANALYTICS_DATA_PAGINATED_REJECTED,
  GET_ANALYTICS_DATA_PENDING,
  GET_ANALYTICS_DATA_REJECTED,
  LEAVE_ANALYTICS_DATA,
  LEAVE_CURRENT_ANALYTICS_DATA,
  SELECTED_ALL_ANALYTICS,
  SELECTED_ANALYTICS,
  SET_OPERATION_FULFILLED,
  SET_OPERATION_PENDING,
} from './action'

const initialState: AnalyticsState = {
  errors: {},
  isError: false,
  loading: false,
  isSelectedAll: false,
  total: 0,
  analyticsData: null,
  analyticsDataPaginated: null,
  currentAnalyticsData: null,
}

const analyticsReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_ANALYTICS_DATA_PENDING:
    case DELETE_TRANSACTION_ANALYTICS_PENDING:
    case GET_ANALYTICS_DATA_PAGINATED_PENDING:
    case SET_OPERATION_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case GET_ANALYTICS_DATA_REJECTED:
    case DELETE_TRANSACTION_ANALYTICS_REJECTED:
    case GET_ANALYTICS_DATA_PAGINATED_REJECTED:
      return {
        ...state,
        errors: payload,
        isError: true,
        loading: false,
      }

    case CHOOSE_ANALYTICS_DATA: {
      const { analyticsData } = state
      return {
        ...state,
        currentAnalyticsData: analyticsData && analyticsData.filter(value => value._id === payload && value)[0],
      }
    }

    case SELECTED_ALL_ANALYTICS: {
      const { analyticsDataPaginated, isSelectedAll } = state
      return {
        ...state,
        isSelectedAll: !isSelectedAll,
        analyticsDataPaginated: analyticsDataPaginated &&
          arrayToObject(Object.values(analyticsDataPaginated).map(value => ({
            ...value,
            selected: !isSelectedAll,
          }))),
      }
    }

    case SELECTED_ANALYTICS: {
      const { analyticsDataPaginated } = state
      return {
        ...state,
        analyticsDataPaginated: analyticsDataPaginated && {
          ...analyticsDataPaginated,
          [payload]: {
            ...analyticsDataPaginated[payload],
            selected: !analyticsDataPaginated[payload].selected,
          }
        },
      }
    }

    case GET_ANALYTICS_DATA_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        total: payload.total,
        analyticsData: payload.data.map((value: JournalAnalyticsData) => ({
          ...value,
          selected: false,
          date: moment(value.date).format('DD.MM.YYYY'),
        })),
      }

    case GET_ANALYTICS_DATA_PAGINATED_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        total: payload.total,
        analyticsDataPaginated: arrayToObject(payload.data.map((value: JournalAnalyticsData) => ({
          ...value,
          selected: false,
          date: moment(value.date).format('DD.MM.YYYY'),
        }))),
      }

    case LEAVE_CURRENT_ANALYTICS_DATA:
      return {
        ...state,
        currentAnalyticsData: null,
      }

    case LEAVE_ANALYTICS_DATA:
      return {
        ...state,
        total: 0,
        analyticsData: null,
        analyticsDataPaginated: null,
      }

    case SET_OPERATION_FULFILLED:
    case DELETE_TRANSACTION_ANALYTICS_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
      }

    default:
      return state
  }
}

export default analyticsReducer
