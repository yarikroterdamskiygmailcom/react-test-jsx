import { RequestBodyFiltersType } from 'src/components/@company/@company:id/@analytics/common/Charts/types'

export const filtersIncome: RequestBodyFiltersType = {
  checkedCategoryIncome: {},
  checkedCategoryConsumption: {},
  checkedCounterparties: {},
  checkedOperationTypes: {},
  checkedTags: {},
  checkedProjects: {},
  consumptionCategories: {},
  counterpartyFilter: {},
  accountsFilter: {},
  operationType: 'income',
  reportType: 'Cash Flow',
  category: 'category',
  startDate: '2018-01-01',
  endDate: '2020-03-31',
}

export const filtersConsumption: RequestBodyFiltersType = {
  checkedCategoryIncome: {},
  checkedCategoryConsumption: {},
  checkedCounterparties: {},
  checkedOperationTypes: {},
  checkedTags: {},
  checkedProjects: {},
  consumptionCategories: {},
  counterpartyFilter: {},
  accountsFilter: {},
  operationType: 'consumption',
  reportType: 'Cash Flow',
  category: 'category',
  startDate: '2018-01-01',
  endDate: '2020-03-31',
}
