import Journal from 'src/api/Journal'
import store from 'src/redux/store'
import { OutputJournalData } from './types'
import { DeleteTransaction, OutputJournalAnalyticsData, SetOperation } from '../types'

export const SET_OPERATION = 'SET_OPERATION'
export const SET_OPERATION_PENDING = 'SET_OPERATION_PENDING'
export const SET_OPERATION_FULFILLED = 'SET_OPERATION_FULFILLED'
export const SET_OPERATION_REJECTED = 'SET_OPERATION_REJECTED'

export const GET_JOURNAL_DATA = 'GET_JOURNAL_DATA'
export const GET_JOURNAL_DATA_PENDING = 'GET_JOURNAL_DATA_PENDING'
export const GET_JOURNAL_DATA_FULFILLED = 'GET_JOURNAL_DATA_FULFILLED'
export const GET_JOURNAL_DATA_REJECTED = 'GET_JOURNAL_DATA_REJECTED'

export const GET_JOURNAL_DATA_PAGINATED = 'GET_JOURNAL_DATA_PAGINATED'
export const GET_JOURNAL_DATA_PAGINATED_PENDING = 'GET_JOURNAL_DATA_PAGINATED_PENDING'
export const GET_JOURNAL_DATA_PAGINATED_FULFILLED = 'GET_JOURNAL_DATA_PAGINATED_FULFILLED'
export const GET_JOURNAL_DATA_PAGINATED_REJECTED = 'GET_JOURNAL_DATA_PAGINATED_REJECTED'

export const UPDATE_TRANSACTION_DATA = 'UPDATE_TRANSACTION_DATA'
export const UPDATE_TRANSACTION_DATA_PENDING = 'UPDATE_TRANSACTION_DATA_PENDING'
export const UPDATE_TRANSACTION_DATA_FULFILLED = 'UPDATE_TRANSACTION_DATA_FULFILLED'
export const UPDATE_TRANSACTION_DATA_REJECTED = 'UPDATE_TRANSACTION_DATA_REJECTED'

export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const DELETE_TRANSACTION_PENDING = 'DELETE_TRANSACTION_PENDING'
export const DELETE_TRANSACTION_FULFILLED = 'DELETE_TRANSACTION_FULFILLED'
export const DELETE_TRANSACTION_REJECTED = 'DELETE_TRANSACTION_REJECTED'

export const SELECTED_JOURNAL = 'SELECTED_JOURNAL'
export const SELECTED_ALL_JOURNAL = 'SELECTED_ALL_JOURNAL'
export const CHOOSE_JOURNAL_DATA = 'CHOOSE_JOURNAL_DATA'

export const LEAVE_JOURNAL_DATA = 'LEAVE_JOURNAL_DATA'
export const LEAVE_CURRENT_JOURNAL_DATA = 'LEAVE_CURRENT_JOURNAL_DATA'

const setOperation = (setOperationData: SetOperation) => {
  const data = {
    ...setOperationData,
    exchange_rate: store.getState().currency.inputExchangeRate,
  }

  return {
    type: SET_OPERATION,
    payload: Journal.setOperation(data),
  }
}

const getJournalData = (data: OutputJournalData | null) => ({
  type: GET_JOURNAL_DATA,
  payload: Journal.getJournalData(data)
})

const getJournalDataPaginated = (data: OutputJournalAnalyticsData | null) => ({
  type: GET_JOURNAL_DATA_PAGINATED,
  payload: Journal.getJournalDataPaginated(data)
})

const selectAllJournal = () => ({
  type: SELECTED_ALL_JOURNAL,
})

const selectedRowJournal = (id: string) => ({
  type: SELECTED_JOURNAL,
  payload: id,
})

const chooseRowJournal = (id: string) => ({
  type: CHOOSE_JOURNAL_DATA,
  payload: id,
})

const leaveCurrentJournalData = () => ({
  type: LEAVE_CURRENT_JOURNAL_DATA,
})

const leaveJournalData = () => ({
  type: LEAVE_JOURNAL_DATA,
})

const updateTransactionData = (setOperationData: SetOperation) => {
  const data = {
    ...setOperationData,
    exchange_rate: store.getState().currency.inputExchangeRate,
  }

  return {
    type: UPDATE_TRANSACTION_DATA,
    payload: Journal.updateTransactionData(data),
  }
}

const deleteTransaction = (data: DeleteTransaction) => ({
  type: DELETE_TRANSACTION,
  payload: Journal.deleteTransaction(data),
})

export default {
  setOperation,

  getJournalData,
  getJournalDataPaginated,

  chooseRowJournal,

  selectAllJournal,
  selectedRowJournal,

  leaveCurrentJournalData,
  leaveJournalData,

  updateTransactionData,
  deleteTransaction,
}
