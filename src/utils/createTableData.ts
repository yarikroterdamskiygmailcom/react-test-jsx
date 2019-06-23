import { DataForColumnChartType } from 'src/components/@company/@company:id/@analytics/common/Charts/types'

export const createTableData = (dataForColumnChart: DataForColumnChartType[], dates: { [key: string]: string }) =>
  Object.values(dataForColumnChart).map((value) => {
    const tableDataValues: number[] = Object.keys(dates)
      .reduce((acc: number[], val: string): number[] => {
        value.values[val] ? acc.push(+value.values[val].toFixed(2)) : acc.push(0)
        return acc
      },      [])
    const { name, values } = value
    const tableValues = Object.values(values)

    return {
      name,
      tableValues,
      tableDataValues
    }
  })
