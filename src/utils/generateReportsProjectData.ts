import _ from 'lodash'
import { JournalAnalyticsData } from 'src/redux/app/types'

const generateReportsProjectData = (data: [JournalAnalyticsData] | null) => {

  const projectTableData = _.chain(data)
    .groupBy(item => _.get(item, 'project._id', ''))
    // tslint:disable-next-line: no-any
    .reduce<any, any>((acc: { incomeValue: number, consumptionValue: number, name: string, id: string }[], value) => {
      const values = _.groupBy(value, item => _.get(item, 'operationType'))

      const incomeValue = _.reduce<JournalAnalyticsData, number>(values.income, (acc, val) => {
        acc += Number(val.sum)
        return acc
      },                                                         0)

      const consumptionValue = _.reduce<JournalAnalyticsData, number>(values.consumption, (acc, val) => {
        acc += Number(val.sum)
        return acc
      },                                                              0)

      const name: string = value[0].project ? value[0].project.label : ''
      const id = value[0].project ? value[0].project._id : ''

      if (name !== '') acc.push({ incomeValue, consumptionValue, name, id })
      return acc
    },                [])
    .value()

  return projectTableData
}

export default generateReportsProjectData
