import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import companyDrawer from 'src/redux/app/ui/companyDrawer/action'

const mapStateToProps = (store: AppState) => ({
  isDrawerOpened: store.ui.companyDrawer.isDrawerOpened,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    openDrawer: bindActionCreators(companyDrawer.openDrawer, dispatch),
    closeDrawer: bindActionCreators(companyDrawer.closeDrawer, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
