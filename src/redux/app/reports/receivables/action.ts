import Journal from 'src/api/Journal'
import { OutputJournalAnalyticsData } from 'src/redux/app/types'
import { TableCounterpartyType } from './types'

export const GET_RECEIVABLES_DATA = 'GET_RECEIVABLES_DATA'
export const GET_RECEIVABLES_DATA_PENDING = 'GET_RECEIVABLES_DATA_PENDING'
export const GET_RECEIVABLES_DATA_FULFILLED = 'GET_RECEIVABLES_DATA_FULFILLED'
export const GET_RECEIVABLES_DATA_REJECTED = 'GET_RECEIVABLES_DATA_REJECTED'

export const REMOVE_RECEIVABLES_DATA = 'REMOVE_RECEIVABLES_DATA'
export const CHOOSE_COUNTERPARTY = 'CHOOSE_COUNTERPARTY'
export const REMOVE_COUNTERPARTY = 'REMOVE_COUNTERPARTY'

const getReceivablesData = (data: OutputJournalAnalyticsData | null) => ({
  type: GET_RECEIVABLES_DATA,
  payload: Journal.getJournalData(data)
})

const removeReceivablesData = () => ({
  type: REMOVE_RECEIVABLES_DATA,
})

const chooseCounterparty = (data: TableCounterpartyType) => ({
  type: CHOOSE_COUNTERPARTY,
  payload: data,
})

const removeCounterparty = () => ({
  type: REMOVE_COUNTERPARTY,
})

export default {
  getReceivablesData,
  removeReceivablesData,
  chooseCounterparty,
  removeCounterparty,
}
