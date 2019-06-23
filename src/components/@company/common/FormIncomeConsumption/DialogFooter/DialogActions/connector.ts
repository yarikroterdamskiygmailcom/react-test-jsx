import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  journalData: store.journal.currentJournalData,
  analyticsData: store.analytics.currentAnalyticsData,
  isIncomeOpened: store.ui.headerButton.isIncomeOpened,
  isConsumptionOpened: store.ui.headerButton.isConsumptionOpened,
  isRepeatDisabled: store.ui.headerButton.isRepeatDisabled,
})

export default connect(mapStateToProps)
