import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import analytics from 'src/redux/app/analytics/action'
import { AppState } from 'src/redux/app/reducers'
import generateAnalyticsData from 'src/utils/generateAnalyticsData'

const mapStateToProps = (store: AppState) => ({
  loading: store.analytics.loading,
  user: store.auth.user,
  company: store.company.currentCompany,
  tableFilter: store.ui.tableFilter,
  filtersData: store.ui.secondaryData.filtersData,
  sortedData: generateAnalyticsData(store.analytics.analyticsData, store.company.currentCompany),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getAnalyticsData: bindActionCreators(analytics.getAnalyticsData, dispatch),
    leaveAnalyticsData: bindActionCreators(analytics.leaveAnalyticsData, dispatch),
    leaveCurrentAnalyticsData: bindActionCreators(analytics.leaveCurrentAnalyticsData, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
