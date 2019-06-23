import React, { Component } from 'react'
import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import { ExchangeRate } from 'src/redux/app/currency/types'
import { OutputJournalData } from 'src/redux/app/journal/types'
import { JournalAnalyticsData, JournalAnalyticsDataKey, OutputJournalAnalyticsData } from 'src/redux/app/types'
import { InternalAccountsBalance, OutputInternalAccountsBalance } from 'src/redux/app/ui/secondaryData/types'
import { RowOrPage, TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import Calendar from 'src/components/controls/BigCalendar'
import connector from './connector'
import CalendarTable from './common/CalendarTable'
import moment from 'moment'
import Loading from '../../../common/Loading'

interface Props {
  loading: boolean,
  user: User | null,
  company: Company | null,
  tableFilter: TableFilterState,
  exchangeRate: ExchangeRate | null,
  journalData: [JournalAnalyticsData] | null,
  journalDataPaginated: JournalAnalyticsDataKey | null,
  balance: InternalAccountsBalance[] | null,
  actions: {
    sortTable: (orderBy: string) => void,
    changeRowOrPage: (rowOrPage: RowOrPage) => void,

    getJournalDataPaginated: (data: OutputJournalAnalyticsData) => void,

    getJournalData: (data: OutputJournalData) => void,
    getInternalAccountsBalance: (data: OutputInternalAccountsBalance) => void,
  }
}

class CalendarScene extends Component<Props> {
  public state = {
    selectedDate: '',
  }

  public componentDidMount() {
    const { user, company, actions } = this.props
    const { getJournalData, getInternalAccountsBalance } = actions

    if (company && user) {
      const data = {
        userId: user.id,
        companyId: company._id,
      }
      const balanceData = {
        user_id: user.id,
        company_id: company._id,
      }

      getInternalAccountsBalance(balanceData)
      getJournalData(data)
    }
  }

  public onSelectEvent = (event: any) => {
    const date = moment(event.start).format('YYYY-MM-DD')
    this.setState({ selectedDate: date })
  }

  public onSelectChart = (date: string) => this.setState({ selectedDate: date })

  public render() {
    const {
      loading,
      actions,
      tableFilter,
      journalData,
      journalDataPaginated,
      user,
      company,
      exchangeRate,
      balance,
    } = this.props
    const { selectedDate } = this.state

    if (!journalData) return <Loading/>

    return (
      <div>
        <Calendar
          data={journalData}
          company={company}
          exchangeRate={exchangeRate}
          balance={balance}
          onSelectEvent={this.onSelectEvent}
          onSelectChart={this.onSelectChart}
        />
        <CalendarTable
          user={user}
          company={company}
          selectedDate={selectedDate}
          loading={loading}
          actions={actions}
          tableFilter={tableFilter}
          journalDataPaginated={journalDataPaginated}
        />
      </div>
    )
  }
}

export default connector(CalendarScene)
