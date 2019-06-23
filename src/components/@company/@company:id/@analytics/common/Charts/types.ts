// import { CourseValue } from 'src/redux/app/currency/types'

export type DataForColumnChartType = {
  name: string,
  values: { [key: string]: number },
  visible?: boolean,
  _colorIndex?: number,
  operationType: string,
  y?: number,
  currency: string
}

export type DataForPieChart = {
  name: string,
  value: number,
  visible: boolean,
  y: number,
  operationType: string,
  currency: string,
}

export type XAxisValuesType = {
  [key: string]: string,
}

export type LegendSeriesType = {
  name: string,
  type: string,
  data: number[],
}

export type OptionsAnalyticsData = {
  // currency: CourseValue,
  dataForColumnChart: DataForColumnChartType[],
  dataForPieChart: DataForPieChart[],
  titleForColumnChart: string,
  titleForPieChart: string,
}

export type PieSeriesDataType = (number | string)[][]

export type SumSaldoDataType = {
  y: number,
  marker: {
    fillColor: string | undefined,
    radius: number,
  }
}

export type RequestBodyFiltersType = {
  checkedCategoryIncome: RequestBodyFilterObjectType,
  checkedCategoryConsumption: RequestBodyFilterObjectType,
  checkedCounterparties: RequestBodyFilterObjectType,
  checkedOperationTypes: RequestBodyFilterObjectType,
  checkedTags: RequestBodyFilterObjectType,
  checkedProjects: RequestBodyFilterObjectType,
  consumptionCategories: RequestBodyFilterObjectType,
  counterpartyFilter: RequestBodyFilterObjectType,
  accountsFilter: RequestBodyFilterObjectType,
  operationType: string,
  reportType: string,
  category: string,
  startDate: string,
  endDate: string,
}

type RequestBodyFilterObjectType = { [key: string]: boolean } | {}
