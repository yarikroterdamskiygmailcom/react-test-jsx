import { User } from 'src/redux/app/auth/types'
import { Company, InputDataValue } from 'src/redux/app/company/types'
import { SchedulePeriods } from 'src/redux/app/ui/secondaryData/types'
import { ExchangeRate } from 'src/redux/app/currency/types'
import { JournalAnalyticsData, SetOperation } from 'src/redux/app/types'
import { TableCounterpartyType } from 'src/redux/app/reports/receivables/types'

export type FormProps = {
  user: User | null,
  company: Company | null,
  exchangeRate: ExchangeRate | null,
  journalData: JournalAnalyticsData | null,
  analyticsData: JournalAnalyticsData | null,
  schedulePeriods: [SchedulePeriods] | null,
  chosenCounterparty: TableCounterpartyType | null,
  onSubmit: (data: SetOperation) => void,
  onDelete: () => void,
}

export type FormikValue = {
  sum: number | string,
  comment: string,
  accountTo: string,
  accountFrom: string,
  repeatMonth: string,
  date: string | Date,
  repeat: boolean,
  scheduled: boolean,
  tags: InputDataValue[],
  exchangeRate: number | string | null,
  incomeCategory: string | null,
  projectsTransfer: string | null,
  counterpartyTo: string | null,
  counterpartyFrom: string | null,
  consumptionCategory: string | null,
  exchangeRateInput: string | number,
}
