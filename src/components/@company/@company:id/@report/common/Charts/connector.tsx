import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import generateAnalyticsData from 'src/utils/generateAnalyticsData'

const mapStateToProps = (store: AppState) => ({
  sortedData: generateAnalyticsData(store.analytics.analyticsData, store.company.currentCompany),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)
