import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import journal from 'src/redux/app/journal/action'
import headerButton from 'src/redux/app/ui/headerButton/action'
import tableFilter from 'src/redux/app/ui/tableFilter/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  total: store.journal.total,
  tableFilter: store.ui.tableFilter,
  company: store.company.currentCompany,
  journalData: store.journal.journalDataPaginated,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    chooseRowJournal: bindActionCreators(journal.chooseRowJournal, dispatch),
    openIncome: bindActionCreators(headerButton.openIncome, dispatch),
    openTransfer: bindActionCreators(headerButton.openTransfer, dispatch),
    openConsumption: bindActionCreators(headerButton.openConsumption, dispatch),
    getJournalDataPaginated: bindActionCreators(journal.getJournalDataPaginated, dispatch),
    changeRowOrPage: bindActionCreators(tableFilter.changeRowOrPage, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
