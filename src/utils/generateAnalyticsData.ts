import _ from 'lodash'
import { Company } from 'src/redux/app/company/types'
import { income, consumption } from 'src/constants'
import { DataForColumnChartType } from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { JournalAnalyticsData } from 'src/redux/app/types'

const generateAnalyticsData = (data: [JournalAnalyticsData] | null, company: Company | null) => {
  let totalSum: number = 0
  if (Array.isArray(data)) totalSum = _.reduce(data, (acc, currVal) => +acc + +currVal.sum, 0)

  const dataForColumnChart = _.chain(data)
    .groupBy(item => _.get(item, 'incomeCategory._id', _.get(item, 'category._id', _.get(item, 'consumptionCategory._id'))))
    .reduce<any, any>((acc: { [key: string]: DataForColumnChartType }, value, key) => {
      const values = _.reduce<JournalAnalyticsData, { [key: string]: number }>(value, (acc, val) => {
        const splitDate = val.date.split('.')
        const date = `${splitDate[2]}-${splitDate[1]}`
        acc[date] ? acc[date] += +val.sum : acc[date] = +val.sum
        return acc
      },                                                                       {})

      const name: string = value[0].category ? value[0].category.label :
        (value[0].incomeCategory ? value[0].incomeCategory.label :
            (value[0].consumptionCategory ? value[0].consumptionCategory.label : '')
        )
      const visible: boolean = true

      const operationTypesArray: string[] = value.map((el: JournalAnalyticsData) =>
        el.operationType === income ? income : (
          el.operationType === consumption ? consumption : (
            el.operationType === 'transfer' && el.incomeCategory ? income : consumption
          )
        ))
      const operationTypesSet = [...new Set(operationTypesArray)]
      const operationType = operationTypesSet[0]

      const currency = company ? company.currency.symbol : 'Currency is undefined'

      acc[key] = { values, name, visible, operationType, currency }
      return acc
    },                {})
    .value()

  const dataForPieChart = _.chain(data)
    .groupBy(item => _.get(item, 'incomeCategory._id', _.get(item, 'category._id', _.get(item, 'consumptionCategory._id'))))
    .reduce<any, any>((acc, val, key) => {
      const value = _.reduce<any, number>(val, (acc, v) => {
        acc += +v.sum
        return acc
      },                                  0)

      const name: string = val[0].category ? val[0].category.label :
        (val[0].incomeCategory ? val[0].incomeCategory.label :
            (val[0].consumptionCategory ? val[0].consumptionCategory.label : '')
        )

      const visible: boolean = true
      const y: number = (value / totalSum) * +'100'
      const operationTypesArray: string[] = val.map((el: JournalAnalyticsData) =>
        el.operationType === income ? income : (
          el.operationType === consumption ? consumption : (
            el.operationType === 'transfer' && el.incomeCategory ? income : consumption
          )
        ))
      const operationTypesSet = [...new Set(operationTypesArray)]
      const operationType = operationTypesSet[0]

      const currency = company ? company.currency.symbol : 'Currency is undefined'

      acc[key] = { value, name, visible, y, operationType, currency }
      return acc
    },                {})
    .value()

  const currency = company ? company.currency : null
  const titleForColumnChart = '"ФИЛЬТР_1" по "ФИЛЬТР_2" в динамике'
  const titleForPieChart = '"ФИЛЬТР_1" по "ФИЛЬТР_2"'

  return { dataForColumnChart, dataForPieChart, currency, titleForColumnChart, titleForPieChart }
}

export default generateAnalyticsData
