import { FiltersData } from '../../types'

export type SecondaryState = {
  errors: object,
  isError: boolean,
  loading: boolean,
  filtersData: FiltersData | null,
  schedulePeriods: [SchedulePeriods] | null,
  internalAccountsBalance: InternalAccountsBalance[] | null,
  tags: boolean,
  operationsTypes: boolean,
  incomeCategories: boolean,
  consumptionCategories: boolean,
  projects: boolean,
  componentRef: object | null,
}

export type SecondaryStateKey = {
  [key: string]: object | boolean | FiltersData | [SchedulePeriods] | null,
}

export type SchedulePeriods = {
  _id: string,
  label: string,
  value: string,
  schedule_period_id: number,
}

export type GetFiltersData = {
  user_id: string,
  company_id: string,
  role_id: number,
}

export type OutputInternalAccountsBalance = {
  user_id: string,
  company_id: string,
}

export type InternalAccountsBalance = {
  date: string,
  sum: number,
}
