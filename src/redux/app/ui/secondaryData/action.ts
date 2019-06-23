import Journal from 'src/api/Journal'
import PaymentCalendar from 'src/api/PaymentCalendar'
import { GetFiltersData, OutputInternalAccountsBalance } from './types'
import { InputDataValue } from '../../company/types'

export const GET_SCHEDULE_PERIODS = 'GET_SCHEDULE_PERIODS'
export const GET_SCHEDULE_PERIODS_PENDING = 'GET_SCHEDULE_PERIODS_PENDING'
export const GET_SCHEDULE_PERIODS_FULFILLED = 'GET_SCHEDULE_PERIODS_FULFILLED'
export const GET_SCHEDULE_PERIODS_REJECTED = 'GET_SCHEDULE_PERIODS_REJECTED'

export const GET_INTERNAL_ACCOUNTS_BALANCE = 'GET_INTERNAL_ACCOUNTS_BALANCE'
export const GET_INTERNAL_ACCOUNTS_BALANCE_PENDING = 'GET_INTERNAL_ACCOUNTS_BALANCE_PENDING'
export const GET_INTERNAL_ACCOUNTS_BALANCE_FULFILLED = 'GET_INTERNAL_ACCOUNTS_BALANCE_FULFILLED'
export const GET_INTERNAL_ACCOUNTS_BALANCE_REJECTED = 'GET_INTERNAL_ACCOUNTS_BALANCE_REJECTED'

export const GET_FILTERS_DATA = 'GET_FILTERS_DATA'
export const GET_FILTERS_DATA_PENDING = 'GET_FILTERS_DATA_PENDING'
export const GET_FILTERS_DATA_FULFILLED = 'GET_FILTERS_DATA_FULFILLED'
export const GET_FILTERS_DATA_REJECTED = 'GET_FILTERS_DATA_REJECTED'

export const SELECTED_ALL_FILTERS_VALUES = 'SELECTED_ALL_FILTERS_VALUES'
export const SELECTED_FILTERS_VALUES = 'SELECTED_FILTERS_VALUES'

export const GET_COMPONENTS_REF = 'GET_COMPONENTS_REF'

const getSchedulePeriods = () => ({
  type: GET_SCHEDULE_PERIODS,
  payload: Journal.getSchedulePeriods(),
})

const getInternalAccountsBalance = (data: OutputInternalAccountsBalance) => ({
  type: GET_INTERNAL_ACCOUNTS_BALANCE,
  payload: PaymentCalendar.getCalendarBalance(data)
})

const getFiltersData = (data: GetFiltersData) => ({
  type: GET_FILTERS_DATA,
  payload: Journal.getFiltersData(data),
})

const selectedAllFiltersValues = (name: string) => ({
  type: SELECTED_ALL_FILTERS_VALUES,
  payload: name,
})

const selectedFiltersValues = (name: string, value: InputDataValue) => ({
  type: SELECTED_FILTERS_VALUES,
  payload: { name, value },
})

const getComponentRef = (componentRef: object | null) => ({
  type: GET_COMPONENTS_REF,
  payload: componentRef,
})

export default {
  getSchedulePeriods,
  getFiltersData,
  getInternalAccountsBalance,

  selectedAllFiltersValues,
  selectedFiltersValues,

  getComponentRef,
}
