import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  isFiltersOpened: store.ui.tableFilter.isFiltersOpened,
})

const mapDispatchToProps = () => ({
  actions: {},
})

export default connect(mapStateToProps, mapDispatchToProps)
