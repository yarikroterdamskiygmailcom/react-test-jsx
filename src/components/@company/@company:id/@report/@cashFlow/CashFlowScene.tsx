import React, { Component } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { OptionsAnalyticsData } from 'src/components/@company/@company:id/@analytics/common/Charts/types'
import { FiltersData, Months, OutputJournalAnalyticsData, Value } from 'src/redux/app/types'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { Company } from 'src/redux/app/company/types'
import { User } from 'src/redux/app/auth/types'
import { emptyLabels, informationLabels, reportIconSize } from 'src/constants'
import { ValueType } from 'react-select/lib/types'
import { generateArrayOfDates } from 'src/utils/generateArrayOfDates'
import { globalStyles } from 'src/styles/global-styles'
import InformationOutline from 'mdi-react/InformationOutlineIcon'

import Loading from 'src/components/common/Loading'
import ReportPieChart from '../common/Charts/ReportPieChart'
import ReportLineChart from '../common/Charts/ReportLineChart'
import { reportLineChartOptions } from '../common/Charts/options'
import ReportLink from '../common/Link/ReportLink'
import FiltersMonth from '../common/FiltersMonth'
import TypesCharts from '../common/TypesCharts'
import ReportTable from '../common/ReportTable'
import connector from './connector'
import CustomTooltip from 'src/components/common/Tooltip'

const styles = (theme: Theme) => createStyles({
  root: {
    ...globalStyles.fullWidth,
  },
  links: {
    margin: '20px 0 20px 60px',
    [theme.breakpoints.down('md')]: {
      margin: '20px 0 20px 15px'
    },
  },
  containerLink: {
    ...globalStyles.flexBetween,
  },
  container: {
    height: 43,
    margin: '10px 50px 0',
    ...globalStyles.flexBetween,
    '@media (max-width: 1279.98px)': {
      margin: '10px 5px 0',
    },
    '@media (max-width: 799.98px)': {
      margin: '10px 0',
    },
    '@media (max-width: 440px)': {
      flexDirection: 'column-reverse',

    },
  },
  profitBlockDesktop: {
    '@media (max-width: 799.98px)': {
      display: 'none',
    },
  },
  profitBlockMobile: {
    display: 'none',
    '@media (max-width: 799.98px)': {
      ...globalStyles.fullWidth,
      ...globalStyles.flexCenter,
    },
  },
  profitBlock: {
    height: '100%',
    marginTop: 13,
    marginRight: 20,
    borderRadius: 10,
    width: 'fit-content',
    border: '1px solid #b6b9aa',
    '@media (max-width: 799.98px)': {
      margin: '10px auto 0 10px',
      padding: 0,
      maxWidth: 210,
    },
  },
  profit: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    margin: '0 auto',
    '@media (max-width: 1439.98px)': {
      fontSize: 12,
    },
    '@media (max-width: 799.98px)': {
      padding: 6,
    }
  },
})

type State = {
  chartType: string,
  startMonth: ValueType<Value> | null,
  endMonth: ValueType<Value> | null,
}

interface Props extends WithStyles<typeof styles> {
  filtersData: FiltersData | null,
  sortedData: OptionsAnalyticsData,
  loading: boolean,
  user: User | null,
  company: Company | null,
  tableFilter: TableFilterState,
  actions: {
    getAnalyticsData: (data: OutputJournalAnalyticsData) => void,
    leaveCurrentAnalyticsData: () => void,
    leaveAnalyticsData: () => void,
  },
}

class CashFlowScene extends Component<Props, State> {
  public state = {
    chartType: 'line',
    startMonth: null,
    endMonth: null,
  }

  public componentDidMount() {
    this.getAnalyticsData()
  }

  public getAnalyticsData = async () => {
    const { user, company, tableFilter, actions } = this.props
    const { startMonth, endMonth } = this.state

    const startDate = startMonth ? moment((startMonth as unknown as Months).date).format('YYYY-MM') : '2018-01'
    const endDate = endMonth ? moment((endMonth as unknown as Months).date).format('YYYY-MM') : '2018-12'

    if (company && user) {
      const data = {
        companyId: company._id,
        userId: user.id,
        filters: {
          operationType: 'profit',
          reportType: 'Cash Flow',
          startDate: `${startDate}-01`,
          endDate: `${endDate}-${moment(endDate).daysInMonth()}`,
        },
        page: tableFilter.page,
        order: tableFilter.order,
        orderBy: tableFilter.orderBy,
        rowsPerPage: tableFilter.rowsPerPage,
      }

      await actions.getAnalyticsData(data)
    }
  }

  public componentWillUnmount() {
    const { leaveAnalyticsData, leaveCurrentAnalyticsData } = this.props.actions
    leaveCurrentAnalyticsData()
    leaveAnalyticsData()
  }

  public handleClick = (value: string) => () => {
    this.setState({
      chartType: value,
    })
  }

  public handleChangeStartMonth = (value: ValueType<Value>) => {
    this.setState({
      startMonth: value,
    },            this.getAnalyticsData)
  }

  public handleChangeEndMonth = (value: ValueType<Value>) => {
    this.setState({
      endMonth: value,
    },            this.getAnalyticsData)
  }

  public render() {
    const { classes, sortedData, loading, filtersData, company } = this.props
    const { startMonth, endMonth, chartType } = this.state

    const links = (
      <div className={classes.links}>
        <ReportLink path="">
          Все отчеты
        </ReportLink>{' / '}
        <ReportLink path="/cash_flow">
          Cash Flow
        </ReportLink>
        <CustomTooltip text={informationLabels[1]} bottom>
          <InformationOutline size={reportIconSize} />
        </CustomTooltip>
      </div>
    )

    if (loading) return <div> {links} <Loading /></div>

    const arrayOfDates = generateArrayOfDates({ startDate: '2018-01-01', endDate: '2018-12-31' })

    const reportData = reportLineChartOptions(
      sortedData.dataForColumnChart,
      arrayOfDates,
      emptyLabels,
    )

    const labels = {
      income: 'Поступления',
      consumption: 'Выплаты',
      saldo: 'Чистый денежный поток',
    }

    const currency = company && company.currency.symbol

    return (
      <div className={classes.root}>
        <div className={classes.containerLink}>
          {links}
          <div className={classNames(classes.profitBlock, classes.profitBlockDesktop)}>
            <Typography align="center" variant="subtitle1" className={classes.profit}>
              Чистый денежный поток: {reportData.sumSaldoData.toLocaleString('ru')} {currency}
            </Typography>
          </div>
        </div>

        <div className={classes.container}>
          {filtersData && (
            <FiltersMonth
              startMonth={startMonth}
              endMonth={endMonth}
              filtersData={filtersData}
              onChangeStart={this.handleChangeStartMonth}
              onChangeEnd={this.handleChangeEndMonth}
            />)}

          <div className={classes.profitBlockDesktop}>
            <TypesCharts handleClick={this.handleClick} />
          </div>
        </div>

        <div className={classes.profitBlockMobile}>
          <div className={classes.profitBlock}>
            <Typography align="center" variant="subtitle1" className={classes.profit}>
              ЧДП: {reportData.sumSaldoData.toLocaleString('ru')} $
            </Typography>
          </div>

          <TypesCharts handleClick={this.handleClick} />
        </div>

        {chartType === 'line'
          ? <ReportLineChart arrayOfDates={arrayOfDates} labels={labels} />
          : <ReportPieChart labels={labels} />}

        <ReportTable currency={currency} arrayOfDates={arrayOfDates} type={'Cash Flow'} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(CashFlowScene))
