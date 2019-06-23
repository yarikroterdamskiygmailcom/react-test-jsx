import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  analyticsData: store.analytics.analyticsData,
  company: store.company.currentCompany,
  journalFilters: store.ui.secondaryData.filtersData
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)
