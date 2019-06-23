import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import journal from 'src/redux/app/journal/action'
import analytics from 'src/redux/app/analytics/action'
import tableFilter from 'src/redux/app/ui/tableFilter/action'
import { bindActionCreators, Dispatch } from 'redux'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  journalTotal: store.journal.total,
  analyticsTotal: store.analytics.total,
  tableFilter: store.ui.tableFilter,
  company: store.company.currentCompany,
  journalData: store.journal.journalDataPaginated,
  analyticsData: store.analytics.analyticsDataPaginated,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getJournalDataPaginated: bindActionCreators(journal.getJournalDataPaginated, dispatch),
    getAnalyticsDataPaginated: bindActionCreators(analytics.getAnalyticsDataPaginated, dispatch),
    changeRowOrPage: bindActionCreators(tableFilter.changeRowOrPage, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
