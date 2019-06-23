import moment from 'moment'
import { XAxisValuesType } from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { FiltersType } from 'src/redux/app/ui/tableFilter/types'
import _ from 'lodash'

export type GenerateArrayOfDatesType = {
  xAxisMonths: string[],
  xAxisValues: { [key: string]: string },
  xAxisMonthsAndYear: string[],
}

export const generateArrayOfDates = (
  requestBody: FiltersType | {},
  journalDates?: { startDate: string, endDate: string } | {}
): GenerateArrayOfDatesType => {

  if (journalDates) {
    const filtersValues: any = Object.values(requestBody)
    const filtersKeys = Object.keys(requestBody)

    const journalDatesValues = journalDates && Object.values(journalDates)

    const startDate = moment(journalDatesValues![0]).format('YYYY-MM-DD')
    const endDate = moment(journalDatesValues![1]).format('YYYY-MM-DD')

    const todayDate = moment().format('YYYY-MM-DD')

    const dateStart = moment(filtersKeys.includes('startDate') ?
      filtersValues[filtersValues.length - 2] :
      startDate !== 'Invalid date' ? startDate : '2018-01-01'
    )
    const dateEnd = moment(filtersKeys.includes('endDate') ?
      filtersValues[filtersValues.length - 1] :
      endDate !== 'Invalid date' ? endDate : todayDate)

    const xAxisValues: XAxisValuesType = {}
    while (dateEnd >= dateStart || dateStart.format('M') === dateEnd.format('M')) {
      const [year, month]: string[] = dateStart.format().split('-')
      xAxisValues[`${year}-${month}`] = dateStart.format('MMMM').charAt(0).toUpperCase() + dateStart.format('MMMM').slice(1)
      dateStart.add(1, 'month')
    }

    const xAxisMonths = _.values(xAxisValues)
    const xAxisMonthsAndYear = _.map(xAxisValues, (el: string, key: string) => `${el} ${key.slice(0, 4)}`)

    return { xAxisMonths, xAxisValues, xAxisMonthsAndYear }
  }
  const filtersValues: any = Object.values(requestBody)
  const filtersKeys = Object.keys(requestBody)

  const dateStart = moment(filtersKeys.includes('startDate') ?
    filtersValues[filtersValues.length - 2] :
    '2018-01-01'
  )
  const dateEnd = moment(filtersKeys.includes('endDate') ?
    filtersValues[filtersValues.length - 1] :
    '2018-12-31')

  const xAxisValues: XAxisValuesType = {}
  while (dateEnd >= dateStart || dateStart.format('M') === dateEnd.format('M')) {
    const [year, month]: string[] = dateStart.format().split('-')
    xAxisValues[`${year}-${month}`] = dateStart.format('MMMM').charAt(0).toUpperCase() + dateStart.format('MMMM').slice(1)
    dateStart.add(1, 'month')
  }

  const xAxisMonths = _.values(xAxisValues)
  const xAxisMonthsAndYear = _.map(xAxisValues, (el: string, key: string) => `${el} ${key.slice(0, 4)}`)

  return { xAxisMonths, xAxisValues, xAxisMonthsAndYear }
}
