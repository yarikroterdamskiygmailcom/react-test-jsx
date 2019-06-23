import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  id: store.company.currentCompany!._id,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)
