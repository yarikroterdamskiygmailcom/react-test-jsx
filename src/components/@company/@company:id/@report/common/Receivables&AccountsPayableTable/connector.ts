import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import receivables from 'src/redux/app/reports/receivables/action'
import headerButton from 'src/redux/app/ui/headerButton/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  company: store.company.currentCompany,
  loading: store.receivables.loading,
  journalData: store.receivables.receivablesData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getJournalData: bindActionCreators(receivables.getReceivablesData, dispatch),
    removeJournalData: bindActionCreators(receivables.removeReceivablesData, dispatch),
    chooseCounterparty: bindActionCreators(receivables.chooseCounterparty, dispatch),
    openTransfer: bindActionCreators(headerButton.openTransfer, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
