import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import auth from 'src/redux/app/auth/action'
import firstForm from 'src/redux/app/auth/firstForm/action'

const mapStateToProps = (store: AppState) => ({
  email: store.firstForm.email,
  phone: store.firstForm.phone,
  leedId: store.firstForm.leedId,
  isError: store.firstForm.isError,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    firstForm: bindActionCreators(firstForm.addLeed, dispatch),
    register: bindActionCreators(auth.register, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
