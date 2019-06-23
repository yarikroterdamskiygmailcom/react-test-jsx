import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import tableFilter from 'src/redux/app/ui/tableFilter/action'
import { bindActionCreators, Dispatch } from 'redux'

const mapStateToProps = (store: AppState) => ({
  company: store.company.currentCompany,
  companyAccounts: store.company.accounts,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    chooseFund: bindActionCreators(tableFilter.chooseFund, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
