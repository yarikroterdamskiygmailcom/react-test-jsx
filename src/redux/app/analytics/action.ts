import Analytics from 'src/api/Analytics'
import { DeleteTransaction, OutputJournalAnalyticsData } from '../types'

export const GET_ANALYTICS_DATA = 'GET_ANALYTICS_DATA'
export const GET_ANALYTICS_DATA_PENDING = 'GET_ANALYTICS_DATA_PENDING'
export const GET_ANALYTICS_DATA_FULFILLED = 'GET_ANALYTICS_DATA_FULFILLED'
export const GET_ANALYTICS_DATA_REJECTED = 'GET_ANALYTICS_DATA_REJECTED'

export const GET_ANALYTICS_DATA_PAGINATED = 'GET_ANALYTICS_DATA_PAGINATED'
export const GET_ANALYTICS_DATA_PAGINATED_PENDING = 'GET_ANALYTICS_DATA_PAGINATED_PENDING'
export const GET_ANALYTICS_DATA_PAGINATED_FULFILLED = 'GET_ANALYTICS_DATA_PAGINATED_FULFILLED'
export const GET_ANALYTICS_DATA_PAGINATED_REJECTED = 'GET_ANALYTICS_DATA_PAGINATED_REJECTED'

export const DELETE_TRANSACTION_ANALYTICS = 'DELETE_TRANSACTION'
export const DELETE_TRANSACTION_ANALYTICS_PENDING = 'DELETE_TRANSACTION_ANALYTICS_PENDING'
export const DELETE_TRANSACTION_ANALYTICS_FULFILLED = 'DELETE_TRANSACTION_ANALYTICS_FULFILLED'
export const DELETE_TRANSACTION_ANALYTICS_REJECTED = 'DELETE_TRANSACTION_ANALYTICS_REJECTED'

export const SET_OPERATION_PENDING = 'SET_OPERATION_PENDING'
export const SET_OPERATION_FULFILLED = 'SET_OPERATION_FULFILLED'

export const CHOOSE_ANALYTICS_DATA = 'CHOOSE_ANALYTICS_DATA'
export const SELECTED_ANALYTICS = 'SELECTED_ANALYTICS'
export const SELECTED_ALL_ANALYTICS = 'SELECTED_ALL_ANALYTICS'

export const LEAVE_ANALYTICS_DATA = 'LEAVE_ANALYTICS_DATA'
export const LEAVE_CURRENT_ANALYTICS_DATA = 'LEAVE_CURRENT_ANALYTICS_DATA'

const getAnalyticsData = (data: OutputJournalAnalyticsData | null) => ({
  type: GET_ANALYTICS_DATA,
  payload: Analytics.getAnalyticsData(data)
})

const getAnalyticsDataPaginated = (data: OutputJournalAnalyticsData | null) => ({
  type: GET_ANALYTICS_DATA_PAGINATED,
  payload: Analytics.getAnalyticsDataPaginated(data)
})

const chooseRowAnalytics = (id: string) => ({
  type: CHOOSE_ANALYTICS_DATA,
  payload: id,
})

const deleteTransaction = (data: DeleteTransaction) => ({
  type: DELETE_TRANSACTION_ANALYTICS,
  payload: Analytics.deleteTransaction(data),
})

const setOperationPending = () => ({
  type: SET_OPERATION_PENDING,
})

const setOperationFulfilled = () => ({
  type: SET_OPERATION_FULFILLED,
})

const selectedAllAnalytics = () => ({
  type: SELECTED_ALL_ANALYTICS,
})

const selectedRowAnalytics = (id: string) => ({
  type: SELECTED_ANALYTICS,
  payload: id,
})

const leaveCurrentAnalyticsData = () => ({
  type: LEAVE_CURRENT_ANALYTICS_DATA,
})

const leaveAnalyticsData = () => ({
  type: LEAVE_ANALYTICS_DATA,
})

export default {
  getAnalyticsDataPaginated,
  getAnalyticsData,

  leaveCurrentAnalyticsData,
  leaveAnalyticsData,

  selectedAllAnalytics,
  selectedRowAnalytics,

  chooseRowAnalytics,
  deleteTransaction,

  setOperationPending,
  setOperationFulfilled,
}
