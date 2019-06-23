import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  company: store.company.currentCompany,
  journalData: store.journal.currentJournalData,
  analyticsData: store.analytics.currentAnalyticsData,
  isIncomeOpened: store.ui.headerButton.isIncomeOpened,
  schedulePeriods: store.ui.secondaryData.schedulePeriods,
  isConsumptionOpened: store.ui.headerButton.isConsumptionOpened,
})

const mapDispatchToProps = () => ({
  actions: {},
})

export default connect(mapStateToProps, mapDispatchToProps)
