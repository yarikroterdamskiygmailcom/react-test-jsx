import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import headerButton from 'src/redux/app/ui/headerButton/action'
import journal from 'src/redux/app/journal/action'
import analytics from 'src/redux/app/analytics/action'
import currency from 'src/redux/app/currency/action'

const mapStateToProps = (store: AppState) => ({
  journalData: store.journal.currentJournalData,
  analyticsData: store.analytics.currentAnalyticsData,
  receivablesData: store.receivables.receivablesData,
  isIncomeOpened: store.ui.headerButton.isIncomeOpened,
  isTransferOpened: store.ui.headerButton.isTransferOpened,
  isConsumptionOpened: store.ui.headerButton.isConsumptionOpened,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    closeIncome: bindActionCreators(headerButton.closeIncome, dispatch),
    closeTransfer: bindActionCreators(headerButton.closeTransfer, dispatch),
    closeConsumption: bindActionCreators(headerButton.closeConsumption, dispatch),
    leaveCurrentJournalData: bindActionCreators(journal.leaveCurrentJournalData, dispatch),
    leaveCurrentAnalyticsData: bindActionCreators(analytics.leaveCurrentAnalyticsData, dispatch),
    resetInputSum: bindActionCreators(currency.resetInputSum, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
