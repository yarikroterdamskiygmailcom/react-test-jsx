import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import receivables from 'src/redux/app/reports/receivables/action'
import tableFilter from 'src/redux/app/ui/tableFilter/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  tableFilter: store.ui.tableFilter,
  loading: store.receivables.loading,
  company: store.company.currentCompany,
  journalData: store.receivables.receivablesData,
  chosenCounterparty: store.receivables.chosenCounterparty,
  isTransferOpened: store.ui.headerButton.isTransferOpened
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getReceivablesData: bindActionCreators(receivables.getReceivablesData, dispatch),
    removeReceivablesData: bindActionCreators(receivables.removeReceivablesData, dispatch),
    removeCounterparty: bindActionCreators(receivables.removeCounterparty, dispatch),

    sortTable: bindActionCreators(tableFilter.sortTable, dispatch),
    changeRowOrPage: bindActionCreators(tableFilter.changeRowOrPage, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
