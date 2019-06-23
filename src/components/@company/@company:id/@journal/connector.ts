import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import journal from 'src/redux/app/journal/action'
import tableFilter from 'src/redux/app/ui/tableFilter/action'
import headerButton from 'src/redux/app/ui/headerButton/action'
import secondaryData from 'src/redux/app/ui/secondaryData/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  total: store.journal.total,
  loading: store.journal.loading,
  tableFilter: store.ui.tableFilter,
  company: store.company.currentCompany,
  journalData: store.journal.journalDataPaginated,
  isSelectedAll: store.journal.isSelectedAll,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    sortTable: bindActionCreators(tableFilter.sortTable, dispatch),
    getComponentRef: bindActionCreators(secondaryData.getComponentRef, dispatch),

    selectedRowJournal: bindActionCreators(journal.selectedRowJournal, dispatch),
    selectAllJournal: bindActionCreators(journal.selectAllJournal, dispatch),

    changeRowOrPage: bindActionCreators(tableFilter.changeRowOrPage, dispatch),
    chooseRowJournal: bindActionCreators(journal.chooseRowJournal, dispatch),

    leaveJournalData: bindActionCreators(journal.leaveJournalData, dispatch),
    leaveCurrentJournalData: bindActionCreators(journal.leaveCurrentJournalData, dispatch),

    getJournalDataPaginated: bindActionCreators(journal.getJournalDataPaginated, dispatch),
    deleteJournalTransaction: bindActionCreators(journal.deleteTransaction, dispatch),

    openIncome: bindActionCreators(headerButton.openIncome, dispatch),
    openTransfer: bindActionCreators(headerButton.openTransfer, dispatch),
    openConsumption: bindActionCreators(headerButton.openConsumption, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
