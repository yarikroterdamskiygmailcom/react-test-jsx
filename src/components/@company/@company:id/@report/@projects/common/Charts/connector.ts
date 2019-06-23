import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import analytics from 'src/redux/app/analytics/action'
import reports from 'src/redux/app/reports/action'
import tableFilter from 'src/redux/app/ui/tableFilter/action'

const mapStateToProps = (store: AppState) => ({
  loading: store.reportsAnalytics.loading,
  total: store.reportsAnalytics.total,
  user: store.auth.user,
  tableFilter: store.ui.tableFilter,
  company: store.company.currentCompany,
  isSelectedAll: store.reportsAnalytics.isSelectedAll,
  analyticsDataPaginated: store.reportsAnalytics.analyticsDataPaginated,
  chosenProjectsData: store.reportsAnalytics.chosenProjectsData
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    sortTable: bindActionCreators(tableFilter.sortTable, dispatch),

    deleteReportsTransaction: bindActionCreators(reports.deleteTransaction, dispatch),
    getReportsDataPaginated: bindActionCreators(reports.getReportsDataPaginated, dispatch),
    getReportsData: bindActionCreators(analytics.getAnalyticsData, dispatch),

    resetOnlyFilters: bindActionCreators(tableFilter.resetOnlyFilters, dispatch),
    outputAnalyticsFilters: bindActionCreators(tableFilter.outputAnalyticsFilters, dispatch),

    selectedRowReports: bindActionCreators(reports.selectedRowReports, dispatch),
    selectedAllReports: bindActionCreators(reports.selectedAllReports, dispatch),

    changeRowOrPage: bindActionCreators(tableFilter.changeRowOrPage, dispatch),
    leaveAnalyticsData: bindActionCreators(analytics.leaveAnalyticsData, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
