import { AnyAction } from 'redux'
import moment from 'moment'
import { AnalyticsProjectsDataType } from './types'
import { JournalAnalyticsData } from 'src/redux/app/types'
import {
  CHOOSE_REPORTS_PROJECT,
  DELETE_TRANSACTION_ANALYTICS_FULFILLED,
  GET_ANALYTICS_REPORTS_DATA_FULFILLED,
  GET_ANALYTICS_REPORTS_DATA_PAGINATED_FULFILLED,
  GET_ANALYTICS_REPORTS_DATA_PAGINATED_PENDING,
  GET_ANALYTICS_REPORTS_DATA_PAGINATED_REJECTED,
  GET_ANALYTICS_REPORTS_DATA_PENDING,
  GET_ANALYTICS_REPORTS_DATA_REJECTED,
  GET_REPORTS_DATA_FOR_TABLE_FULFILLED,
  GET_REPORTS_DATA_FOR_TABLE_PENDING,
  GET_REPORTS_DATA_FOR_TABLE_REJECTED,
  LEAVE_REPORTS_DATA,
  REMOVE_REPORTS_PROJECT_DATA,
  SELECTED_ALL_REPORTS,
  SELECTED_REPORTS,
} from './action'

const initialState: AnalyticsProjectsDataType = {
  errors: {},
  isError: false,
  loading: false,
  total: 0,
  isSelectedAll: false,
  analyticsData: null,
  analyticsDataPaginated: null,
  analyticsDataForTable: null,
  chosenProjectsData: null,
}

const analyticsReportsReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_ANALYTICS_REPORTS_DATA_PENDING:
    case GET_REPORTS_DATA_FOR_TABLE_PENDING:
    case GET_ANALYTICS_REPORTS_DATA_PAGINATED_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case GET_ANALYTICS_REPORTS_DATA_REJECTED:
    case GET_REPORTS_DATA_FOR_TABLE_REJECTED:
    case GET_ANALYTICS_REPORTS_DATA_PAGINATED_REJECTED:
      return {
        ...state,
        errors: payload,
        isError: true,
        loading: false,
      }

    case GET_ANALYTICS_REPORTS_DATA_FULFILLED:
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

    case GET_ANALYTICS_REPORTS_DATA_PAGINATED_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        total: payload.total,
        analyticsDataPaginated: payload.data.map((value: JournalAnalyticsData) => ({
          ...value,
          selected: false,
          date: moment(value.date).format('DD.MM.YYYY'),
        })),
      }

    case GET_REPORTS_DATA_FOR_TABLE_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        total: payload.total,
        analyticsDataForTable: payload.data.map((value: JournalAnalyticsData) => ({
          ...value,
          selected: false,
          date: moment(value.date).format('DD.MM.YYYY'),
        })),
      }

    case SELECTED_ALL_REPORTS: {
      const { analyticsDataPaginated, isSelectedAll } = state
      return {
        ...state,
        isSelectedAll: !isSelectedAll,
        analyticsDataPaginated: analyticsDataPaginated && analyticsDataPaginated.map((value: JournalAnalyticsData) => ({
          ...value,
          selected: !isSelectedAll,
        })),
      }
    }

    case SELECTED_REPORTS: {
      const { analyticsDataPaginated } = state
      return {
        ...state,
        analyticsDataPaginated: analyticsDataPaginated && analyticsDataPaginated.map((value: JournalAnalyticsData) =>
          value._id === payload
            ? ({
              ...value,
              selected: !value.selected,
            })
            : value),
      }
    }

    case LEAVE_REPORTS_DATA:
      return {
        ...state,
        total: 0,
        analyticsData: null,
        analyticsDataPaginated: null,
      }

    case CHOOSE_REPORTS_PROJECT:
      return {
        ...state,
        chosenProjectsData: payload
      }

    case REMOVE_REPORTS_PROJECT_DATA:
      return {
        ...state,
        chosenProjectsData: null
      }

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

export default analyticsReportsReducer
