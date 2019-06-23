import { JournalAnalyticsData } from 'src/redux/app/types'
import { TableCounterpartyType } from 'src/redux/app/reports/receivables/types'
import { InputDataValue, InputValue } from 'src/redux/app/company/types'

export type ReceivablesState = {
  isError: boolean,
  errors: object,
  total: number,
  loading: boolean,
  receivablesData: [JournalAnalyticsData] | null,
  chosenCounterparty: TableCounterpartyType | null,
}

export type TableCounterpartyType = {
  label: string,
  sum: number,
  tableData: JournalAnalyticsData[],
  date: string | Date,
  accountFrom: InputDataValue | null,
  accountTo: InputDataValue | null,
  counterpartyFrom:InputValue | null,
  counterpartyTo: InputValue | null,
  repeatable: boolean,
}
