import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import auth from 'src/redux/app/auth/action'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    login: bindActionCreators(auth.login, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
