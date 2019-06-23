import { FiltersData, JournalAnalyticsData, JournalAnalyticsDataKey, Value } from '../types'

export type JournalState = {
  errors: object,
  isError: boolean,
  loading: boolean,
  page: number,
  order: string,
  total: number,
  orderBy: string,
  rowsPerPage: number,
  isSelectedAll: boolean,
  currentJournalData: JournalAnalyticsData | null,
  journalData: [JournalAnalyticsData] | null,
  journalDataPaginated: JournalAnalyticsDataKey | null,
}

export type JournalStateKey = {
  [key: string]: boolean | string | number | {} | Value | FiltersData | JournalAnalyticsData | [JournalAnalyticsData] | null,
}

export type OutputJournalData = {
  companyId: string,
  userId: string,
}
