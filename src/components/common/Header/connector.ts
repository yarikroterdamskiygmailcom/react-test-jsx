import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  company: store.company.currentCompany,
  isButtonVisible: store.company.isButtonVisible,
})

const mapDispatchToProps = () => ({
  actions: {}
})

export default connect(mapStateToProps, mapDispatchToProps)
