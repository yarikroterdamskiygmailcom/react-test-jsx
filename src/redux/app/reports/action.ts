import Analytics from 'src/api/Analytics'
import { ChosenProjectsData } from './types'
import { DeleteTransaction, OutputJournalAnalyticsData } from '../types'

export const GET_ANALYTICS_REPORTS_DATA = 'GET_ANALYTICS_REPORTS_DATA'
export const GET_ANALYTICS_REPORTS_DATA_PENDING = 'GET_ANALYTICS_REPORTS_DATA_PENDING'
export const GET_ANALYTICS_REPORTS_DATA_FULFILLED = 'GET_ANALYTICS_REPORTS_DATA_FULFILLED'
export const GET_ANALYTICS_REPORTS_DATA_REJECTED = 'GET_ANALYTICS_REPORTS_DATA_REJECTED'

export const GET_ANALYTICS_REPORTS_DATA_PAGINATED = 'GET_ANALYTICS_REPORTS_DATA_PAGINATED'
export const GET_ANALYTICS_REPORTS_DATA_PAGINATED_PENDING = 'GET_ANALYTICS_REPORTS_DATA_PAGINATED_PENDING'
export const GET_ANALYTICS_REPORTS_DATA_PAGINATED_FULFILLED = 'GET_ANALYTICS_REPORTS_DATA_PAGINATED_FULFILLED'
export const GET_ANALYTICS_REPORTS_DATA_PAGINATED_REJECTED = 'GET_ANALYTICS_REPORTS_DATA_PAGINATED_REJECTED'

export const GET_REPORTS_DATA_FOR_TABLE = 'GET_REPORTS_DATA_FOR_TABLE'
export const GET_REPORTS_DATA_FOR_TABLE_PENDING = 'GET_REPORTS_DATA_FOR_TABLE_PENDING'
export const GET_REPORTS_DATA_FOR_TABLE_FULFILLED = 'GET_REPORTS_DATA_FOR_TABLE_FULFILLED'
export const GET_REPORTS_DATA_FOR_TABLE_REJECTED = 'GET_REPORTS_DATA_FOR_TABLE_REJECTED'

export const DELETE_TRANSACTION_ANALYTICS = 'DELETE_TRANSACTION'
export const DELETE_TRANSACTION_ANALYTICS_PENDING = 'DELETE_TRANSACTION_ANALYTICS_PENDING'
export const DELETE_TRANSACTION_ANALYTICS_FULFILLED = 'DELETE_TRANSACTION_ANALYTICS_FULFILLED'
export const DELETE_TRANSACTION_ANALYTICS_REJECTED = 'DELETE_TRANSACTION_ANALYTICS_REJECTED'

export const SELECTED_REPORTS = 'SELECTED_REPORTS'
export const SELECTED_ALL_REPORTS = 'SELECTED_ALL_REPORTS'

export const LEAVE_REPORTS_DATA = 'LEAVE_REPORTS_DATA'

export const CHOOSE_REPORTS_PROJECT = 'CHOOSE_REPORTS_PROJECT'
export const REMOVE_REPORTS_PROJECT_DATA = 'REMOVE_REPORTS_PROJECT_DATA'

const getReportsData = (data: OutputJournalAnalyticsData | null) => ({
  type: GET_ANALYTICS_REPORTS_DATA,
  payload: Analytics.getAnalyticsData(data)
})

const getReportsDataForTable = (data: OutputJournalAnalyticsData | null) => ({
  type: GET_REPORTS_DATA_FOR_TABLE,
  payload: Analytics.getAnalyticsData(data),
})

const getReportsDataPaginated = (data: OutputJournalAnalyticsData | null) => ({
  type: GET_ANALYTICS_REPORTS_DATA_PAGINATED,
  payload: Analytics.getAnalyticsDataPaginated(data)
})

const deleteTransaction = (data: DeleteTransaction) => ({
  type: DELETE_TRANSACTION_ANALYTICS,
  payload: Analytics.deleteTransaction(data),
})

const leaveAnalyticsReportsData = () => ({
  type: LEAVE_REPORTS_DATA,
})

const chooseReportsProject = (data: ChosenProjectsData) => ({
  type: CHOOSE_REPORTS_PROJECT,
  payload: data
})

const selectedAllReports = () => ({
  type: SELECTED_ALL_REPORTS,
})

const selectedRowReports = (id: string) => ({
  type: SELECTED_REPORTS,
  payload: id,
})

const removeReportsProjectData = () => ({
  type: REMOVE_REPORTS_PROJECT_DATA,
})

export default {
  getReportsData,
  getReportsDataPaginated,
  getReportsDataForTable,

  leaveAnalyticsReportsData,

  chooseReportsProject,

  removeReportsProjectData,
  deleteTransaction,

  selectedAllReports,
  selectedRowReports,
}
