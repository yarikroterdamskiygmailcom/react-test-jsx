import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import auth from 'src/redux/app/auth/action'
import company from 'src/redux/app/company/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  company: store.company.currentCompany,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    logout: bindActionCreators(auth.logout, dispatch),
    excel: bindActionCreators(company.excel, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
