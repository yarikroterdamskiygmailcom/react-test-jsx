import React, { FC } from 'react'
import { OptionsAnalyticsData } from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { GenerateArrayOfDatesType } from 'src/utils/generateArrayOfDates'

import { reportLineChartOptions, } from './options'
import connector from './connector'
import { Labels } from './types'

type PandLLineChartProps = {
  sortedData: OptionsAnalyticsData,
  labels: Labels,
  arrayOfDates: GenerateArrayOfDatesType,
}

const PandLLineChart: FC<PandLLineChartProps> = ({
  sortedData,
  labels,
  arrayOfDates
}) => {
  const lineOptions = reportLineChartOptions(
    sortedData.dataForColumnChart,
    arrayOfDates,
    labels,
  )

  return (
    <HighchartsReact
      options={lineOptions.options}
      constructorType={'chart'}
      highcharts={Highcharts}
    />
  )
}

export default connector(PandLLineChart)
