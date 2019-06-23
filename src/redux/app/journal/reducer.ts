import moment from 'moment'
import { AnyAction } from 'redux'
import arrayToObject from 'src/utils/arrayToObject'
import { JournalState } from './types'
import { JournalAnalyticsData } from '../types'
import {
  CHOOSE_JOURNAL_DATA,
  DELETE_TRANSACTION_FULFILLED,
  DELETE_TRANSACTION_PENDING,
  DELETE_TRANSACTION_REJECTED,
  GET_JOURNAL_DATA_FULFILLED,
  GET_JOURNAL_DATA_PAGINATED_FULFILLED,
  GET_JOURNAL_DATA_PAGINATED_PENDING,
  GET_JOURNAL_DATA_PAGINATED_REJECTED,
  GET_JOURNAL_DATA_PENDING,
  GET_JOURNAL_DATA_REJECTED,
  LEAVE_CURRENT_JOURNAL_DATA,
  LEAVE_JOURNAL_DATA,
  SELECTED_ALL_JOURNAL,
  SELECTED_JOURNAL,
  SET_OPERATION_FULFILLED,
  SET_OPERATION_PENDING,
  SET_OPERATION_REJECTED,
  UPDATE_TRANSACTION_DATA_FULFILLED,
  UPDATE_TRANSACTION_DATA_PENDING,
  UPDATE_TRANSACTION_DATA_REJECTED,
} from './action'

const initialState: JournalState = {
  isError: false,
  loading: false,
  errors: {},
  page: 0,
  total: 0,
  order: 'desc',
  orderBy: 'date',
  rowsPerPage: 30,
  isSelectedAll: false,
  currentJournalData: null,
  journalData: null,
  journalDataPaginated: null,
}

const journalReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_OPERATION_PENDING:
    case GET_JOURNAL_DATA_PENDING:
    case GET_JOURNAL_DATA_PAGINATED_PENDING:
    case UPDATE_TRANSACTION_DATA_PENDING:
    case DELETE_TRANSACTION_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case DELETE_TRANSACTION_REJECTED:
    case UPDATE_TRANSACTION_DATA_REJECTED:
    case GET_JOURNAL_DATA_REJECTED:
    case GET_JOURNAL_DATA_PAGINATED_REJECTED:
    case SET_OPERATION_REJECTED:
      return {
        ...state,
        loading: false,
        isError: true,
        errors: payload,
      }

    case GET_JOURNAL_DATA_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        total: payload.total,
        journalData: payload.data.map((value: JournalAnalyticsData) => ({
          ...value,
          selected: false,
          date: moment(value.date).format('DD.MM.YYYY'),
        })),
      }

    case GET_JOURNAL_DATA_PAGINATED_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        total: payload.total,
        journalDataPaginated: arrayToObject(payload.data.map((value: JournalAnalyticsData) => ({
          ...value,
          selected: false,
          date: moment(value.date).format('DD.MM.YYYY'),
        }))),
      }

    case CHOOSE_JOURNAL_DATA: {
      const { journalDataPaginated } = state
      return {
        ...state,
        currentJournalData: journalDataPaginated && journalDataPaginated[payload],
      }
    }

    case SELECTED_JOURNAL: {
      const { journalDataPaginated } = state
      return {
        ...state,
        journalDataPaginated: journalDataPaginated && {
          ...journalDataPaginated,
          [payload]: {
            ...journalDataPaginated[payload],
            selected: !journalDataPaginated[payload].selected,
          }
        },
      }
    }

    case SELECTED_ALL_JOURNAL: {
      const { journalDataPaginated, isSelectedAll } = state
      return {
        ...state,
        isSelectedAll: !isSelectedAll,
        journalDataPaginated: journalDataPaginated &&
          arrayToObject(Object.values(journalDataPaginated).map(value => ({
            ...value,
            selected: !isSelectedAll,
          }))),
      }
    }

    case LEAVE_CURRENT_JOURNAL_DATA:
      return {
        ...state,
        currentJournalData: null,
      }

    case LEAVE_JOURNAL_DATA:
      return {
        ...state,
        total: 0,
        journalDataPaginated: null,
      }

    case SET_OPERATION_FULFILLED:
    case DELETE_TRANSACTION_FULFILLED:
    case UPDATE_TRANSACTION_DATA_FULFILLED:
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

export default journalReducer
