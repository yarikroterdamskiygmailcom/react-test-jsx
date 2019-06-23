import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import analytics from 'src/redux/app/analytics/action'
import { AppState } from 'src/redux/app/reducers'
import tableFilter from 'src/redux/app/ui/tableFilter/action'
import headerButton from 'src/redux/app/ui/headerButton/action'

const mapStateToProps = (store: AppState) => ({
  loading: store.analytics.loading,
  total: store.analytics.total,
  user: store.auth.user,
  tableFilter: store.ui.tableFilter,
  company: store.company.currentCompany,
  isSelectedAll: store.analytics.isSelectedAll,
  analyticsData: store.analytics.analyticsData,
  analyticsDataPaginated: store.analytics.analyticsDataPaginated,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    sortTable: bindActionCreators(tableFilter.sortTable, dispatch),

    deleteAnalyticsTransaction: bindActionCreators(analytics.deleteTransaction, dispatch),
    getAnalyticsDataPaginated: bindActionCreators(analytics.getAnalyticsDataPaginated, dispatch),
    getAnalyticsData: bindActionCreators(analytics.getAnalyticsData, dispatch),

    leaveCurrentAnalyticsData: bindActionCreators(analytics.leaveCurrentAnalyticsData, dispatch),
    leaveAnalyticsData: bindActionCreators(analytics.leaveAnalyticsData, dispatch),

    changeRowOrPage: bindActionCreators(tableFilter.changeRowOrPage, dispatch),
    chooseRowAnalytics: bindActionCreators(analytics.chooseRowAnalytics, dispatch),

    selectedRowAnalytics: bindActionCreators(analytics.selectedRowAnalytics, dispatch),
    selectedAllAnalytics: bindActionCreators(analytics.selectedAllAnalytics, dispatch),

    openIncome: bindActionCreators(headerButton.openIncome, dispatch),
    openTransfer: bindActionCreators(headerButton.openTransfer, dispatch),
    openConsumption: bindActionCreators(headerButton.openConsumption, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
