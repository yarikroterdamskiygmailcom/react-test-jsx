import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AppState } from 'src/redux/app/reducers'
import journal from 'src/redux/app/journal/action'
import tableFilter from 'src/redux/app/ui/tableFilter/action'
import secondaryData from 'src/redux/app/ui/secondaryData/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  loading: store.journal.loading,
  tableFilter: store.ui.tableFilter,
  company: store.company.currentCompany,
  journalData: store.journal.journalData,
  exchangeRate: store.currency.exchangeRate,
  journalDataPaginated: store.journal.journalDataPaginated,
  balance: store.ui.secondaryData.internalAccountsBalance,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    sortTable: bindActionCreators(tableFilter.sortTable, dispatch),
    changeRowOrPage: bindActionCreators(tableFilter.changeRowOrPage, dispatch),

    getJournalDataPaginated: bindActionCreators(journal.getJournalDataPaginated, dispatch),

    getJournalData: bindActionCreators(journal.getJournalData, dispatch),
    getInternalAccountsBalance: bindActionCreators(secondaryData.getInternalAccountsBalance, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
