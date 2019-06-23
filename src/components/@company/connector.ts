import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AppState } from 'src/redux/app/reducers'
import journal from 'src/redux/app/journal/action'
import headerButton from 'src/redux/app/ui/headerButton/action'
import currency from 'src/redux/app/currency/action'
import analytics from 'src/redux/app/analytics/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  tableFilter: store.ui.tableFilter,
  company: store.company.currentCompany,
  journalDataPaginated: store.journal.journalDataPaginated,
  analyticsDataPaginated: store.analytics.analyticsDataPaginated,
  journalData: store.journal.currentJournalData,
  analyticsData: store.analytics.currentAnalyticsData,
  isButtonVisible: store.company.isButtonVisible,
  isIncomeOpened: store.ui.headerButton.isIncomeOpened,
  isTransferOpened: store.ui.headerButton.isTransferOpened,
  isConsumptionOpened: store.ui.headerButton.isConsumptionOpened,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    setOperation: bindActionCreators(journal.setOperation, dispatch),
    resetInputSum: bindActionCreators(currency.resetInputSum, dispatch),
    closeIncome: bindActionCreators(headerButton.closeIncome, dispatch),
    closeTransfer: bindActionCreators(headerButton.closeTransfer, dispatch),
    deleteTransaction: bindActionCreators(journal.deleteTransaction, dispatch),
    closeConsumption: bindActionCreators(headerButton.closeConsumption, dispatch),
    leaveCurrentJournalData: bindActionCreators(journal.leaveCurrentJournalData, dispatch),
    leaveCurrentAnalyticsData: bindActionCreators(analytics.leaveCurrentAnalyticsData, dispatch),
    updateTransactionData: bindActionCreators(journal.updateTransactionData, dispatch),
    getJournalDataPaginated: bindActionCreators(journal.getJournalDataPaginated, dispatch),
    getAnalyticsData: bindActionCreators(analytics.getAnalyticsData, dispatch),
    getAnalyticsDataPaginated: bindActionCreators(analytics.getAnalyticsDataPaginated, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
