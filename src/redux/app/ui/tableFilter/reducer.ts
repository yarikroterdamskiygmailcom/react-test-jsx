import moment from 'moment'
import { AnyAction } from 'redux'
import {
  accounts,
  consumption,
  consumptionCategories,
  counterparties,
  income,
  incomeCategories,
  operationsTypes,
  Order,
  projects,
  tags,
} from 'src/constants'
import { getCheckedAccountsFilters, getCheckedFilters } from 'src/utils/filters'
import {
  CHANGE_ROW_OR_PAGE,
  CHOOSE_CAPITAL,
  IS_OPEN_FILTER_COMMENT,
  IS_OPEN_FILTERS,
  OUTPUT_ANALYTICS_FILTERS,
  OUTPUT_JOURNAL_FILTERS,
  RESET_FILTERS,
  RESET_ONLY_FILTERS,
  SORT_TABLE
} from './action'
import { FiltersKey, TableFilterState } from './types'
import { InputDataValue } from '../../company/types'

const initialState: TableFilterState = {
  filters: {},
  page: 0,
  order: 'desc',
  orderBy: 'date',
  rowsPerPage: 30,
  accounts: null,
  date: null,
  category: null,
  counterparties: null,
  isFiltersOpened: false,
  isFilterCommentOpened: false,
  analyticsPage: [
    { selected: true, value: income, label: 'Поступения' },
    { selected: false, value: consumption, label: 'Выплаты' },
    { selected: false, value: 'profit', label: 'Сальдо', labelReport: 'Прибыль' },
  ],
  reportType: [
    { selected: true, value: 'Cash Flow', label: 'Cash Flow' },
    { selected: false, value: 'P&L', label: 'P&L' },
  ],
}

const tableFilterReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SORT_TABLE:
      return {
        ...state,
        order: state.orderBy === payload && state.order === Order.desc ? Order.asc : Order.desc,
        orderBy: payload,
      }

    case CHANGE_ROW_OR_PAGE:
      return {
        ...state,
        page: payload.page === 0 ? 0 : payload.page || state.page,
        rowsPerPage: payload.rowsPerPage || state.rowsPerPage
      }

    case IS_OPEN_FILTER_COMMENT:
      return {
        ...state,
        isFilterCommentOpened: !state.isFilterCommentOpened,
      }

    case IS_OPEN_FILTERS:
      return {
        ...state,
        isFiltersOpened: !state.isFiltersOpened,
      }

    case RESET_FILTERS: {
      const reportType = state.reportType.map(value => value.value === 'Cash Flow'
        ? {
          ...value,
          selected: true,
        }
        : {
          ...value,
          selected: false,
        })

      const analyticsPage = state.analyticsPage.map(value => value.value === income
        ? {
          ...value,
          selected: true,
        }
        : {
          ...value,
          selected: false,
        })

      return {
        ...state,
        reportType,
        analyticsPage,
        category: null,
        isFilterCommentOpened: false,
        isFiltersOpened: false,
        filters: {
          ...{},
        },
        date: null,
        accounts: null,
        counterparties: null,
      }
    }

    case RESET_ONLY_FILTERS:
      return {
        ...state,
        filters: {
          ...{}
        }
      }

    case OUTPUT_JOURNAL_FILTERS:
    case OUTPUT_ANALYTICS_FILTERS: {
      const {
        startDate,
        endDate,
        journal,
        analytics,
        operationType,
        reportTypeForm,
        reportType,
        date,
        comment,
        category,
        categoryForm,
        ...data
      } = payload

      let checkedCategoryIncome: FiltersKey | {} = {}
      let checkedCategoryConsumption: FiltersKey | {} = {}
      let checkedCounterparties: FiltersKey | {} = {}
      let checkedOperationTypes: FiltersKey | {} = {}
      let checkedTags: FiltersKey | {} = {}
      let checkedProjects: FiltersKey | {} = {}
      let accountsFilter: FiltersKey | {} = {}

      Object.keys(data).map((key: string) => (
        data[key] instanceof Array
          ? data[key].map((value: InputDataValue) => {
            checkedCategoryIncome = getCheckedFilters(key, value, incomeCategories, checkedCategoryIncome)
            checkedCategoryConsumption = getCheckedFilters(key, value, consumptionCategories, checkedCategoryConsumption)
            checkedCounterparties = getCheckedFilters(key, value, counterparties, checkedCounterparties)
            checkedOperationTypes = getCheckedFilters(key, value, operationsTypes, checkedOperationTypes)
            checkedTags = getCheckedFilters(key, value, tags, checkedTags)
            checkedProjects = getCheckedFilters(key, value, projects, checkedProjects)
            accountsFilter = getCheckedFilters(key, value, accounts, accountsFilter)
          })
          : null
      ))

      return {
        ...state,
        date,
        category: categoryForm || state.category,
        analyticsPage: analytics || state.analyticsPage,
        reportType: reportTypeForm || state.reportType,
        accounts: payload.accounts || state.accounts,
        counterparties: payload.counterparties || state.counterparties,
        isFiltersOpened: false,
        isFilterCommentOpened: false,

        filters: {
          ...state.filters,
          checkedCategoryIncome,
          checkedCategoryConsumption,
          checkedCounterparties,
          checkedOperationTypes,
          checkedTags,
          checkedProjects,
          accountsFilter,
          category,
          reportType,
          operationType,
          query: comment,
          typesFilter: journal,
          startDate: moment(date[0]).format('YYYY-MM-DD'),
          endDate: moment(date[1]).format('YYYY-MM-DD'),
        },
      }
    }

    case CHOOSE_CAPITAL: {
      const accountsState = state.accounts
      let accountsFilter: FiltersKey | {} = {}

      if (accountsState) {
        const index = accountsState.findIndex(value => value._id === payload._id)
        if (index < 0) accountsState.push({ ...payload, selected: true })
        else accountsState.splice(index, 1)
      }

      const accounts = accountsState
        ? [...accountsState]
        : [{
          ...payload,
          selected: true,
        }]

      accounts.map(value =>
        accountsFilter = getCheckedAccountsFilters(value, accountsFilter))

      return {
        ...state,
        accounts,
        filters: {
          ...state.filters,
          accountsFilter,
        },
      }
    }

    default:
      return state
  }
}

export default tableFilterReducer
