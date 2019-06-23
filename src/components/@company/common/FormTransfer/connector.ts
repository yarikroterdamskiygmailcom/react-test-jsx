import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  company: store.company.currentCompany,
  exchangeRate: store.currency.exchangeRate,
  journalData: store.journal.currentJournalData,
  analyticsData: store.analytics.currentAnalyticsData,
  schedulePeriods: store.ui.secondaryData.schedulePeriods,
  chosenCounterparty: store.receivables.chosenCounterparty,
})

const mapDispatchToProps = () => ({
  actions: {},
})

export default connect(mapStateToProps, mapDispatchToProps)
