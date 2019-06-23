import { SumSaldoDataType } from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { Options } from 'highcharts'

export type Labels = {
  income: string,
  consumption: string,
  saldo: string,
}
export type ReportData = {
  sumSaldoData: number,
  allDataObj: NewSaldoDataType | undefined,
  options: Options,
}

export type NewSaldoDataType = {
  newSaldoDataIncome: number[],
  newSaldoDataConsumption: number[],
  newSaldoData: SumSaldoDataType[],
  newArrayOfDates: string[],
  newObjOfDates: { [key: string]: string }
}

export type TableData = {
  name: string,
  tableValues: number[],
  tableDataValues: number[]
}
