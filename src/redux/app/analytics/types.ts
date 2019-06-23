import { JournalAnalyticsData, JournalAnalyticsDataKey } from '../types'

export type AnalyticsState = {
  errors: {},
  isError: boolean,
  loading: boolean,
  isSelectedAll: boolean,
  total: number,
  analyticsData: [JournalAnalyticsData] | null,
  analyticsDataPaginated: JournalAnalyticsDataKey | null,
  currentAnalyticsData: JournalAnalyticsData | null,
}
