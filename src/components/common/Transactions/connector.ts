import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import headerButton from 'src/redux/app/ui/headerButton/action'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    openIncome: bindActionCreators(headerButton.openIncome, dispatch),
    openTransfer: bindActionCreators(headerButton.openTransfer, dispatch),
    openConsumption: bindActionCreators(headerButton.openConsumption, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
