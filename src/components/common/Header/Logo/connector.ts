import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import companyDrawer from 'src/redux/app/ui/companyDrawer/action'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    openDrawer: bindActionCreators(companyDrawer.openDrawer, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
