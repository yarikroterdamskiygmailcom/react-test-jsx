import { User } from 'src/redux/app/auth/types'
import { Company, InputDataValue } from 'src/redux/app/company/types'
import { SchedulePeriods } from 'src/redux/app/ui/secondaryData/types'
import { JournalAnalyticsData, SetOperation } from 'src/redux/app/types'

export type FormProps = {
  user: User | null,
  company: Company | null,
  journalData: JournalAnalyticsData | null,
  analyticsData: JournalAnalyticsData | null,
  schedulePeriods: [SchedulePeriods] | null,
  isIncomeOpened: boolean,
  isConsumptionOpened: boolean,
  onSubmit: (data: SetOperation) => void,
  onDelete: () => void,
}

export type FormikValue = {
  income: string,
  consumption: string,
  comment: string,
  account: string,
  projects: string,
  date: string | Date,
  repeatMonth: string,
  counterparty: string,
  sum: string | number,
  repeat: boolean,
  scheduled: boolean,
  tags: InputDataValue[],
}
