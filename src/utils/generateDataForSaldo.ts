import { DataForColumnChartType } from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { GenerateArrayOfDatesType } from 'src/utils/generateArrayOfDates'
import _ from 'lodash'

export const generateDataForSaldo = (data: DataForColumnChartType[] | {}, arrayOfDates: GenerateArrayOfDatesType): number[] => {
  if (Object.keys(data).length) {
    const firstStep = _.map(
      data,
      (v: DataForColumnChartType) => {
        const secondStep: number[] = Object.keys(arrayOfDates.xAxisValues)
          .reduce((acc: number[], value: string): number[] => {
            v.values[value] ? acc.push(+v.values[value].toFixed(2)) : acc.push(0)
            return acc
          },      [])

        return secondStep
      })

    const sumAll = firstStep.reduce((
      acc: number[],
      val: number[],
      idx: number,
    ): number[] => {

      if (idx === 0) {
        return acc
      }

      val.forEach((v, i) => {
        acc[i] += v
      })
      return acc
    },                              firstStep[0])
    return sumAll
  }
  return Object.keys(arrayOfDates.xAxisValues).map(el => Number(!el))
}
