import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  filtersData: store.ui.secondaryData.filtersData,
  tableFilter: store.ui.tableFilter,
})

const mapDispatchToProps = () => ({
  actions: {},
})

export default connect(mapStateToProps, mapDispatchToProps)
