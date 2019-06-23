import { RowOrPage } from './types'
import { FiltersData } from '../../types'
import { InputDataValue } from '../../company/types'

export const SORT_TABLE = 'SORT_TABLE'
export const CHANGE_ROW_OR_PAGE = 'CHANGE_ROW_OR_PAGE'
export const IS_OPEN_FILTER_COMMENT = 'IS_OPEN_FILTER_COMMENT'
export const IS_OPEN_FILTERS = 'IS_OPEN_FILTERS'
export const CHOOSE_CAPITAL = 'CHOOSE_CAPITAL'
export const OUTPUT_JOURNAL_FILTERS = 'OUTPUT_JOURNAL_FILTERS'
export const OUTPUT_ANALYTICS_FILTERS = 'OUTPUT_ANALYTICS_FILTERS'
export const RESET_FILTERS = 'RESET_FILTERS'
export const RESET_ONLY_FILTERS = 'RESET_ONLY_FILTERS'

const sortTable = (orderBy: string) => ({
  type: SORT_TABLE,
  payload: orderBy
})

const changeRowOrPage = (rowOrPage: RowOrPage) => ({
  type: CHANGE_ROW_OR_PAGE,
  payload: rowOrPage,
})

const isOpenFilterComment = () => ({
  type: IS_OPEN_FILTER_COMMENT,
})

const openOrCloseFilters = () => ({
  type: IS_OPEN_FILTERS,
})

const resetFilters = () => ({
  type: RESET_FILTERS,
})

const chooseFund = (data: InputDataValue) => ({
  type: CHOOSE_CAPITAL,
  payload: data,
})

const outputJournalFilters = (filtersData: FiltersData) => ({
  type: OUTPUT_JOURNAL_FILTERS,
  payload: filtersData,
})

const outputAnalyticsFilters = (filtersData: FiltersData) => ({
  type: OUTPUT_ANALYTICS_FILTERS,
  payload: filtersData,
})

const resetOnlyFilters = () => ({
  type: RESET_ONLY_FILTERS,
})

export default {
  sortTable,
  changeRowOrPage,
  isOpenFilterComment,
  openOrCloseFilters,
  resetFilters,
  chooseFund,
  outputJournalFilters,
  outputAnalyticsFilters,
  resetOnlyFilters,
}
