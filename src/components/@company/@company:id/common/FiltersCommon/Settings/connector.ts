import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import tableFilter from 'src/redux/app/ui/tableFilter/action'

const mapStateToProps = (store: AppState) => ({
  tableFilter: store.ui.tableFilter,
  filtersData: store.ui.secondaryData.filtersData,
  componentRef: store.ui.secondaryData.componentRef,
  isFiltersOpened: store.ui.tableFilter.isFiltersOpened,
  isFilterCommentOpened: store.ui.tableFilter.isFilterCommentOpened,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    isOpenFilterComment: bindActionCreators(tableFilter.isOpenFilterComment, dispatch),
    openOrCloseFilters: bindActionCreators(tableFilter.openOrCloseFilters, dispatch),
    resetFilters: bindActionCreators(tableFilter.resetFilters, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
