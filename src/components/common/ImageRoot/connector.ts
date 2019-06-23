import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  company: store.company.currentCompany,
})

const mapDispatchToProps = () => ({
  actions: {}
})

export default connect(mapStateToProps, mapDispatchToProps)
