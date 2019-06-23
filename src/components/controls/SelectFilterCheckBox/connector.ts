import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import secondary from 'src/redux/app/ui/secondaryData/action'
import { bindActionCreators, Dispatch } from 'redux'

const mapStateToProps = (store: AppState) => ({
  filtersData: store.ui.secondaryData.filtersData,
  journalState: store.journal,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    selectedAllFiltersValues: bindActionCreators(secondary.selectedAllFiltersValues, dispatch),
    selectFiltersValues: bindActionCreators(secondary.selectedFiltersValues, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
