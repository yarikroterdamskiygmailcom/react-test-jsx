import { InputDataValue } from '../../company/types'
import { Value } from '../../types'

export type TableFilterState = {
  page: number,
  order: string,
  orderBy: string,
  rowsPerPage: number,
  filters: FiltersType | {},
  reportType: AnalyticsValue[],
  analyticsPage: AnalyticsValue[],
  isFilterCommentOpened: boolean,
  isFiltersOpened: boolean,
  date: [Date, Date] | null,
  category: Value | null,
  accounts: InputDataValue[] | null,
  counterparties: [InputDataValue] | null,
}

export type RowOrPage = {
  page?: number,
  rowsPerPage?: number,
}

export type FiltersType = {
  checkedCategoryIncome?: FiltersKey | {},
  checkedCategoryConsumption?: FiltersKey | {},
  checkedCounterparties?: FiltersKey | {},
  checkedOperationTypes?: FiltersKey | {},
  checkedTags?: FiltersKey | {},
  checkedProjects?: FiltersKey | {},
  accountsFilter?: FiltersKey | {},
  typesFilter?: Value,
  startDate?: Date | string | null,
  endDate?: Date | string | null,
  query?: string,
  operationType?: string,
  reportType?: string,
  category?: string,
}

export type FiltersKey = {
  [key: string]: boolean,
}

export type AnalyticsValue = {
  label: string,
  value: string,
  selected: boolean,
  labelReport?: string,
}
