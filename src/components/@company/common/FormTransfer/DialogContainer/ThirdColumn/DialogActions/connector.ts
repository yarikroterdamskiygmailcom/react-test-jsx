import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  isRepeatDisabled: store.ui.headerButton.isRepeatDisabled,
  journalData: store.journal.currentJournalData,
  analyticsData: store.analytics.currentAnalyticsData,
})

export default connect(mapStateToProps)
