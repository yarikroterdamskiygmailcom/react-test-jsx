import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import reports from 'src/redux/app/reports/action'
import generateReportsProjectsData from 'src/utils/generateReportsProjectData'

const mapStateToProps = (store: AppState) => ({
  sortedData: generateReportsProjectsData(store.reportsAnalytics.analyticsDataForTable),
  loading: store.analytics.loading,
  user: store.auth.user,
  company: store.company.currentCompany,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getReportsDataForTable: bindActionCreators(reports.getReportsDataForTable, dispatch),
    leaveAnalyticsReportsData: bindActionCreators(reports.leaveAnalyticsReportsData, dispatch),
    removeReportsProjectData: bindActionCreators(reports.removeReportsProjectData, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
