import React, { Component } from 'react'
import Calendar from 'react-big-calendar'
import PaymentChart from 'react-highcharts'
import moment from 'moment'
import _ from 'lodash'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { InternalAccountsBalance } from 'src/redux/app/ui/secondaryData/types'
import { Company } from 'src/redux/app/company/types'
import { ExchangeRate } from 'src/redux/app/currency/types'
import Header from './CalendarHeader'
import EventComponent from './EventComponent'
import NotFoundDataPaymentChart from '../../common/NotFoundDataPaymentChart'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './style.css'

moment.locale('ru')
const localizer = Calendar.momentLocalizer(moment)

const styles = createStyles({
  calendar: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 45,
    background: '#ffffff',
  },
  paymentChart: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 45,
  },
})

interface Props extends WithStyles<typeof styles> {
  data: [JournalAnalyticsData] | null,
  company: Company | null,
  exchangeRate: ExchangeRate | null,
  balance: InternalAccountsBalance[] | null,
  onSelectEvent: (event: any) => void
  onSelectChart: (date: any) => void
}

class BigCalendar extends Component<Props> {
  public state = {
    currentDate: moment().toDate(),
    calendarViewType: 'calendar',
  }

  public setNextDate = () => {
    const { currentDate } = this.state
    this.setState({
      currentDate: moment(currentDate).set('month', moment(currentDate).get('month') + 1).toDate(),
    })
  }

  public setPrevDate = () => {
    const { currentDate } = this.state
    this.setState({
      currentDate: moment(currentDate).set('month', moment(currentDate).get('month') - 1).toDate(),
    })
  }

  public selectCalendarView = (type: string) => () => this.setState({ calendarViewType: type })

  public onChangeCalendarDate = (date: Date) => {
    this.setState({ currentDate: new Date(date) })
  }

  public onParseChartData = ({ point: { options: { name } } }: any) => {
    const { onSelectChart } = this.props
    const { currentDate } = this.state
    const getCurrentYear = moment(currentDate).format('YYYY')
    const date = moment(`${name}.${getCurrentYear}`, 'DD.MM.YYYY').format('YYYY-MM-DD')
    onSelectChart(date)
  }

  public setEvents = () => {
    const { data, balance } = this.props
    const { currentDate } = this.state
    const events: any = []
    const calendarMonth = moment(currentDate).format('MM YYYY')
    const dataForChart: any = []
    let dataInMonthLength: number = 0

    if (data && balance) {
      const allSum = _.chain(data)
        .groupBy(item => _.get(item, 'date'))
        .reduce<any>((acc, val, idx) => {
          const income = _.reduce(val, (a, v) => {
            if (v.operationType === 'income' && v.account && v.account.account_type && v.account.account_type.label === 'Внутренний' ||
              v.accountTo && v.accountTo.account_type && v.accountTo.account_type.label === 'Внутренний') {
              a += _.round(v.sum, 2)
              return a
            }
            return a

          },                      0)

          const consumption = _.reduce(val, (a, v) => {
            if (v.operationType === 'consumption' && v.account && v.account.account_type && v.account.account_type.label === 'Внутренний' ||
              v.accountTo && v.accountTo.account_type && v.accountTo.account_type.label === 'Внешний' ||
              v.accountFrom && v.accountFrom.account_type && v.accountFrom.account_type.label === 'Внутренний') {
              a += _.round(v.sum, 2)
              return a
            }
            return a
          },                           0)
          acc[idx] = { income, consumption }
          return acc
        })
        .value()

      balance.forEach((item) => {
        const balanceDate = moment(item.date).format('DD.MM.YYYY')
        const balanceValue = _.round(item.sum, 2)
        Object.keys(allSum).map((key: string) => {
          if (key === balanceDate) {
            events.push({
              income: allSum[key].income,
              consumption: allSum[key].consumption,
              balance: balanceValue,
              allDay: true,
              start: moment(key, 'DD.MM.YYYY').toDate(),
              end: moment(key, 'DD.MM.YYYY').toDate(),
            })
          }
        })

        if (calendarMonth === moment(item.date).format('MM YYYY')) {
          dataForChart.push({
            name: moment(item.date).format('DD.MM'),
            y: balanceValue,
            color: balanceValue > 0 ? '#55cda1' : '#ff7676',
          })
        }
      })

      dataInMonthLength = events.filter((item: any) => {
        if (moment(item.start).format('MM YYYY') === calendarMonth) {
          if (item.income === 0 && item.consumption === 0) {
            return 0
          }
          return item
        }
      }).length

    }
    return { events, dataForChart, dataInMonthLength }
  }

  public getConfigColumn = (symbol: any, data: any) => ({
    credits: {
      enabled: false
    },
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: ''
      },
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },
    title: {
      text: ''
    },
    series: [{
      data,
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        pointFormat: `Остаток: <b>{point.y}</b> ${symbol}`
      },
      events: {
        click: this.onParseChartData
      }
    }]
  })

  public render() {
    const { classes, onSelectEvent } = this.props
    const { currentDate, calendarViewType } = this.state
    const { events, dataForChart, dataInMonthLength } = this.setEvents()

    return (
      <>
        <Header
          currentDate={currentDate}
          prevDate={this.setPrevDate}
          nextDate={this.setNextDate}
          calendarView={this.selectCalendarView}
        />
        {calendarViewType === 'calendar' ?
          <Calendar
            defaultView="month"
            className={classes.calendar}
            date={currentDate}
            onNavigate={this.onChangeCalendarDate}
            events={events}
            components={{
              event: EventComponent,
            }}
            onSelectEvent={onSelectEvent}
            toolbar={false}
            drilldownView={'month'}
            localizer={localizer}
          /> :
          <>
            {dataInMonthLength ?
              <div className={classes.paymentChart}>
                <PaymentChart
                  config={this.getConfigColumn('$', dataForChart) as any}
                />
              </div> :
              <NotFoundDataPaymentChart/>
            }
          </>
        }
      </>
    )
  }
}

export default withStyles(styles)(
  BigCalendar,
)
