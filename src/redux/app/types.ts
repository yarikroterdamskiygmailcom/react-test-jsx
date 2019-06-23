import { InputDataValue, InputValue, SmallValue } from './company/types'
import { AnalyticsValue, FiltersType } from './ui/tableFilter/types'
import { SchedulePeriods } from './ui/secondaryData/types'

export type JournalAnalyticsData = {
  _id: string,
  sum: number,
  date: string,
  comment: string,
  selected: boolean,
  scheduled: boolean,
  operationType: string,
  tags: InputValue[],
  project: InputValue | null,
  exchange_rate?: number | null,
  repeatable: SchedulePeriods | null,
  account?: InputDataValue | null,
  accountTo?: InputDataValue | null,
  accountFrom?: InputDataValue | null,
  counterparty?: InputValue | null,
  counterpartyTo?: InputValue | null,
  counterpartyFrom?: InputValue | null,
  category?: InputValue | null,
  incomeCategory?: InputValue | null,
  consumptionCategory?: InputValue | null,
}

export type JournalAnalyticsDataKey = {
  [key: string]: JournalAnalyticsData,
}

export type OutputJournalAnalyticsData = {
  companyId: string,
  userId: string,
  page: number,
  order: string,
  orderBy: string,
  rowsPerPage: number,
  filters: FiltersType | {},
}

export type SetOperation = {
  sum: number,
  comment: string,
  scheduled: boolean,
  date: string | Date,
  operationType: string,
  user_id: string | null,
  company_id: string | null,
  tags: InputDataValue[] | [],
  exchange_rate?: number | null,
  transaction_id?: string | null,
  repeatable: SchedulePeriods | null,
  project: InputDataValue | string | null,
  account?: InputDataValue | string | null,
  category?: InputDataValue | string | null,
  accountTo?: InputDataValue | string | null,
  accountFrom?: InputDataValue | string | null,
  counterparty?: InputDataValue | string | null,
  counterpartyTo?: InputDataValue | string | null,
  income_category?: InputDataValue | string | null,
  counterpartyFrom?: InputDataValue | string | null,
  consumption_category?: InputDataValue | string | null,
}

export type DeleteTransaction = {
  user_id: string,
  company_id: string,
  transaction_id: string,
}

export type FiltersData = {
  endDate: string | null,
  startDate: string | null,
  initialDate?: Date[],
  months: Months[] | null,
  tags: InputValue[],
  types: [SmallValue] | null,
  accounts?: InputDataValue[] | null,
  operationsTypes: [InputDataValue] | null,
  consumptionCategories: [InputDataValue] | null,
  incomeCategories: [InputDataValue] | null,
  counterparties: [InputValue] | null,
  projects: [InputDataValue] | null,
  comment?: string,
  operationType?: string,
  reportType?: string,
  category?: string,
  categoryForm?: Value | null,
  reportTypeForm?: AnalyticsValue[],
  analytics?: AnalyticsValue[],
}

export type FiltersDataKey = {
  [key: string]:
    string |
    Date[] |
    Value |
    [InputDataValue] |
    InputDataValue[] |
    [InputValue] |
    Months[] |
    [SmallValue] |
    AnalyticsValue[] |
    null |
    undefined,
}

export type Value = {
  value: string,
  label: string,
}

export type Months = {
  label: string,
  value: string,
  date: Date | string,
}
