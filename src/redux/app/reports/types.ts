import { JournalAnalyticsData } from 'src/redux/app/types'

export type AnalyticsProjectsDataType = {
  errors: {},
  isError: boolean,
  loading: boolean,
  isSelectedAll: boolean,
  total: number,
  analyticsData: [JournalAnalyticsData] | null,
  analyticsDataPaginated: [JournalAnalyticsData] | null,
  chosenProjectsData: ChosenProjectsData | null,
  analyticsDataForTable: [JournalAnalyticsData] | null,
}

export type ChosenProjectsData = {
  name: string,
  profit: number,
  profitability: number,
  id: string,
  ids: string[]
}
