import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  reportType: store.ui.tableFilter.reportType,
})

const mapDispatchToProps = () => ({
  actions: {}
})

export default connect(mapStateToProps, mapDispatchToProps)
