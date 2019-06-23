import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import tableFilter from 'src/redux/app/ui/tableFilter/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  company: store.company.currentCompany,
  filtersData: store.ui.secondaryData.filtersData,
  tableFilter: store.ui.tableFilter,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    outputJournalFilters: bindActionCreators(tableFilter.outputJournalFilters, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
