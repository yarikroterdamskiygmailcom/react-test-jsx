import React, { FC } from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import _ from 'lodash'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { globalStyles } from 'src/styles/global-styles'
import { innerWidthCharts, income, consumption } from 'src/constants'
import {
  DataForPieChart,
  OptionsAnalyticsData
} from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { pieChartOptions, } from 'src/components/@company/@company:id/@analytics/common/Charts/options'

import connector from './connector'

const styles = createStyles({
  root: {
    ...globalStyles.fullWidth,
    ...globalStyles.flexAround,
  },
  halfWidth: {
    width: '50%'
  },
  chartColumn: {
    flexDirection: 'column',
  },
  chartsRow: {
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  }
})

interface ReportPieChartProps extends WithStyles<typeof styles> {
  sortedData: OptionsAnalyticsData,
  labels: {
    income: string,
    consumption: string,
    saldo: string,
  }
}

const ReportPieChart: FC<ReportPieChartProps> = ({
  classes,
  sortedData,
  labels,
}) => {
  const innerWidth = window.innerWidth <= innerWidthCharts

  const incomeDataForPieChart = _.pickBy(sortedData.dataForPieChart, el => el.operationType === income)
  const consumptionDataForPieChart = _.pickBy(sortedData.dataForPieChart, el => el.operationType === consumption)

  const pieIncomeOptions = pieChartOptions(
    incomeDataForPieChart as DataForPieChart[],
    labels.income,
  )

  const pieConsumptionOptions = pieChartOptions(
    consumptionDataForPieChart as DataForPieChart[],
    labels.consumption,
  )

  return (
    <div className={classNames([classes.root, innerWidth ? classes.chartColumn : classes.chartsRow])}>
      <div className={innerWidth ? classes.fullWidth : classes.halfWidth}>
        <HighchartsReact
          options={pieIncomeOptions}
          constructorType={'chart'}
          highcharts={Highcharts}
        />
      </div>
      <div className={innerWidth ? classes.fullWidth : classes.halfWidth}>
        <HighchartsReact
          options={pieConsumptionOptions}
          constructorType={'chart'}
          highcharts={Highcharts}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(connector(ReportPieChart))
