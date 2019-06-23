import React, { Component } from 'react'
import pickBy from 'lodash/pickBy'
import { createStyles, Table, withStyles, WithStyles } from '@material-ui/core'
import {
  DataForColumnChartType,
  OptionsAnalyticsData,
} from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import NotFoundDataTable from 'src/components/common/NotFoundDataTable'
import { GenerateArrayOfDatesType } from 'src/utils/generateArrayOfDates'
import { consumption, emptyLabels, income } from 'src/constants'
import { createTableData } from 'src/utils/createTableData'
import { reportLineChartOptions } from '../Charts/options'
import TableHead from './Head'
import TableBody from './Body'
import connector from './connector'

const styles = createStyles({
  root: {
    width: '100%',
    height: '100%',
    background: '#f6fafd',
    overflowX: 'auto',
    marginTop: 30,
  },
  table: {
    width: '100%',
  },
})

interface Props extends WithStyles<typeof styles> {
  sortedIncomeData: OptionsAnalyticsData,
  arrayOfDates: GenerateArrayOfDatesType,
  type: string,
  currency: string | null,
}

class ReportTable extends Component<Props, {}> {
  public render() {
    const { sortedIncomeData, classes, arrayOfDates, type, currency } = this.props

    const reportData = reportLineChartOptions(
      sortedIncomeData.dataForColumnChart,
      arrayOfDates,
      emptyLabels
    )

    const tableArrayOfDates = reportData.allDataObj && [...reportData.allDataObj.newArrayOfDates]
    if (Array.isArray(tableArrayOfDates)) tableArrayOfDates.unshift('')

    const incomeDataForColumnChart = pickBy(sortedIncomeData.dataForColumnChart, el => el.operationType === income)
    const consumptionDataForColumnChart = pickBy(sortedIncomeData.dataForColumnChart, el => el.operationType === consumption)

    const tableIncomeData = reportData.allDataObj &&
      createTableData(incomeDataForColumnChart as DataForColumnChartType[],
                      reportData.allDataObj!.newObjOfDates)

    const tableConsumptionData = reportData.allDataObj &&
      createTableData(consumptionDataForColumnChart as DataForColumnChartType[],
                      reportData.allDataObj!.newObjOfDates)

    return !reportData.allDataObj ? <NotFoundDataTable /> : (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead tableArrayOfDates={tableArrayOfDates} />
          <TableBody
            type={type}
            currency={currency}
            reportData={reportData}
            tableIncomeData={tableIncomeData!}
            tableConsumptionData={tableConsumptionData!}
          />
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(connector(ReportTable))
