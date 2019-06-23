import moment from 'moment'
import { AnyAction } from 'redux'
import { SecondaryState, SecondaryStateKey } from './types'
import { FiltersData, FiltersDataKey } from '../../types'
import { InputDataValue } from '../../company/types'
import {
  GET_COMPONENTS_REF,
  GET_FILTERS_DATA_FULFILLED,
  GET_FILTERS_DATA_PENDING,
  GET_FILTERS_DATA_REJECTED,
  GET_INTERNAL_ACCOUNTS_BALANCE_FULFILLED,
  GET_INTERNAL_ACCOUNTS_BALANCE_PENDING,
  GET_INTERNAL_ACCOUNTS_BALANCE_REJECTED,
  GET_SCHEDULE_PERIODS_FULFILLED,
  GET_SCHEDULE_PERIODS_PENDING,
  GET_SCHEDULE_PERIODS_REJECTED,
  SELECTED_ALL_FILTERS_VALUES,
  SELECTED_FILTERS_VALUES,
} from './action'

const initialState: SecondaryState = {
  errors: {},
  isError: false,
  loading: false,
  filtersData: null,
  componentRef: null,
  schedulePeriods: null,
  internalAccountsBalance: null,
  consumptionCategories: true,
  incomeCategories: true,
  operationsTypes: true,
  projects: true,
  tags: true,
}

const secondaryDataReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_SCHEDULE_PERIODS_PENDING:
    case GET_FILTERS_DATA_PENDING:
    case GET_INTERNAL_ACCOUNTS_BALANCE_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case GET_SCHEDULE_PERIODS_REJECTED:
    case GET_FILTERS_DATA_REJECTED:
    case GET_INTERNAL_ACCOUNTS_BALANCE_REJECTED:
      return {
        ...state,
        loading: false,
        isError: true,
        errors: payload,
      }

    case GET_INTERNAL_ACCOUNTS_BALANCE_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        internalAccountsBalance: payload,
      }

    case GET_SCHEDULE_PERIODS_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        schedulePeriods: payload.data,
      }

    case GET_FILTERS_DATA_FULFILLED: {
      const { startDate, endDate, operationsTypes, ...data } = payload.data

      Object.keys(data).map((key: string) =>
        data[key] = data[key].map((value: FiltersData) => ({
          ...value,
          selected: true,
        })))

      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        filtersData: {
          ...data,
          initialDate: [moment(startDate, 'YYYY-MM-DD').toDate(), moment(endDate, 'YYYY-MM-DD').toDate()],
          startDate: startDate ? moment(startDate, 'YYYY-MM-DD').toDate() : null,
          endDate: endDate ? moment(endDate, 'YYYY-MM-DD').toDate() : null,
          operationsTypes: [
            ...operationsTypes.data.map((value: InputDataValue) => ({
              ...value,
              selected: true,
            })),
          ],
        },
      }
    }

    case SELECTED_ALL_FILTERS_VALUES: {
      const stateKey: SecondaryStateKey = state
      const data: FiltersDataKey | null = state.filtersData

      Object.keys(data!).map((key: string) => key === payload && (
        (data as FiltersDataKey)![key] = (data![key]! as InputDataValue[]).map((value: InputDataValue) => ({
          ...value,
          selected: !stateKey[payload],
        }))))

      return {
        ...state,
        filtersData: {
          ...data,
        },
        [payload]: !stateKey[payload],
      }
    }

    case SELECTED_FILTERS_VALUES: {
      const data: FiltersDataKey | null = state.filtersData

      Object.keys(data!).map((key: string) => key === payload.name && (
        data![key] = (data![key]! as InputDataValue[]).map((value: InputDataValue) => value === payload.value
          ? ({
            ...value,
            selected: !value.selected,
          })
          : value)))

      return {
        ...state,
        filtersData: {
          ...data,
        },
      }
    }

    case GET_COMPONENTS_REF:
      return {
        ...state,
        componentRef: payload,
      }

    default:
      return state
  }
}

export default secondaryDataReducer
