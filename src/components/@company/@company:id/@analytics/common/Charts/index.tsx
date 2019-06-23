import React, { FC, memo } from 'react'
import classNames from 'classnames'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { innerWidthCharts, income, consumption } from 'src/constants'
import { Company } from 'src/redux/app/company/types'
import { FiltersType } from 'src/redux/app/ui/tableFilter/types'
import { generateArrayOfDates } from 'src/utils/generateArrayOfDates'
import { FiltersData, JournalAnalyticsData } from 'src/redux/app/types'
import { HorizontalLine } from 'src/utils/HorizontalLine'
import NotFound from 'src/components/common/NotFound'
import _ from 'lodash'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { columnChartOptions, pieChartOptions, saldoColumnChartOptions, saldoLineChartOptions } from './options'
import generateAnalyticsData from 'src/utils/generateAnalyticsData'
import { DataForPieChart } from './types'
import connector from './connector'

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  rootWidth: {
    width: 'calc(100% - 15px)',
  },
  chartsColumn: {
    flexDirection: 'column',
  },
  chartsRow: {
    flexDirection: 'row',
  },
  pieFlex: {
    ...globalStyles.flexAround,
    width: '100%',
  },
  halfWidth: {
    width: '50%'
  },
  fullWidth: {
    ...globalStyles.fullWidth,
  },
})

interface ChartsProps extends WithStyles<typeof styles> {
  reportsProject?: boolean,
  analyticsData: [JournalAnalyticsData] | null,
  company: Company | null,
  filters: FiltersType | {},
  journalFilters: FiltersData | null,
}

const Charts: FC<ChartsProps> = ({
  classes,
  analyticsData,
  company, filters,
  journalFilters,
  reportsProject
}) => {
  const innerWidth = window.innerWidth <= innerWidthCharts
  const sortedData = generateAnalyticsData(analyticsData, company)

  const filtersValues = Object.values(filters)

  const dates: FiltersType | {} = {
    startDate: journalFilters && journalFilters.startDate,
    endDate: journalFilters && journalFilters.endDate!,
  }

  const arrayOfDates = generateArrayOfDates(filters, dates)

  const incomeSortedData = _.pickBy(sortedData.dataForPieChart, el => el.operationType === income)
  const consumptionSortedData = _.pickBy(sortedData.dataForPieChart, el => el.operationType === consumption)

  if (!filtersValues.length || filtersValues.includes(income)) {
    {
      return Object.keys(sortedData.dataForColumnChart).length ? (
        <div className={classNames([classes.root, innerWidth ? classes.fullWidth : classes.rootWidth])}>
          <HighchartsReact
            options={columnChartOptions(
              sortedData.dataForColumnChart,
              arrayOfDates,
              filtersValues.includes('Cash Flow') || !filtersValues.length ? 'Поступления по категориям в динамике' : 'Доход по категориям в динамике'
            )}
            constructorType={'chart'}
            highcharts={Highcharts}
          />

          {reportsProject ? <HorizontalLine /> : null}

          <HighchartsReact
            options={pieChartOptions(
              incomeSortedData as DataForPieChart[],
              filtersValues.includes('Cash Flow') || !filtersValues.length ? 'Поступления по категориям' : 'Доход по категориям'
            )}
            constructorType={'chart'}
            highcharts={Highcharts}
          />
        </div>) : null
    }
  }

  if (filtersValues.includes(consumption)) {
    return Object.keys(sortedData.dataForColumnChart).length ? (
      <div className={classNames([classes.root, innerWidth ? classes.fullWidth : classes.rootWidth])}>
        <div>
          <HighchartsReact
            options={columnChartOptions(
              sortedData.dataForColumnChart,
              arrayOfDates,
              filtersValues.includes('Cash Flow') ? 'Выплаты по категориям в динамике' : 'Расход по категориям в динамике'
            )}
            constructorType={'chart'}
            highcharts={Highcharts}
          />
        </div>

        {reportsProject ? <HorizontalLine /> : null}

        <div>
          <HighchartsReact
            options={pieChartOptions(
              consumptionSortedData as DataForPieChart[],
              filtersValues.includes('Cash Flow') ? 'Выплаты по категориям' : 'Расход по категориям'
            )}
            constructorType={'chart'}
            highcharts={Highcharts}
          />
        </div>
      </div>
    ) : null
  }

  if (filtersValues.includes('profit')) {

    return (
      <div className={classNames([classes.root, innerWidth ? classes.fullWidth : classes.rootWidth])}>
        <HighchartsReact
          options={saldoLineChartOptions(
            sortedData.dataForColumnChart,
            arrayOfDates,
            filtersValues.includes('Cash Flow') ? 'Сальдо' : 'Прибыль'
          )}
          constructorType={'chart'}
          highcharts={Highcharts}
        />

        <HighchartsReact
          options={saldoColumnChartOptions(
            sortedData.dataForColumnChart,
            arrayOfDates,
            filtersValues.includes('Cash Flow') ? ['Поступления', 'Выплаты'] : ['Доход', 'Расход']
          )}
          constructorType={'chart'}
          highcharts={Highcharts}
        />

        <HorizontalLine />

        <div className={classNames([classes.pieFlex, innerWidth ? classes.chartsColumn : classes.chartsRow])}>
          {Object.keys(incomeSortedData).length ?
            <div className={innerWidth ? classes.fullWidth : classes.halfWidth}>
              <HighchartsReact
                options={pieChartOptions(
                  incomeSortedData as DataForPieChart[],
                  filtersValues.includes('Cash Flow') ? 'Поступления по категориям' : 'Доход по категориям'
                )}
                constructorType={'chart'}
                highcharts={Highcharts}
              />
            </div> : null}
          {Object.keys(consumptionSortedData).length
            ? <div className={innerWidth ? classes.fullWidth : classes.halfWidth}>
              <HighchartsReact
                options={pieChartOptions(
                  consumptionSortedData as DataForPieChart[],
                  filtersValues.includes('Cash Flow') ? 'Выплаты по категориям' : 'Расход по категориям'
                )}
                constructorType={'chart'}
                highcharts={Highcharts}
              />
            </div>
            : null}
        </div>

      </div>
    )
  }
  return <NotFound />
}

export default withStyles(styles)(connector(memo(Charts)))
