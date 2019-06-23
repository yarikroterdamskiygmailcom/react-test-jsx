import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import headerButton from 'src/redux/app/ui/headerButton/action'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  isRepeatDisabled: store.ui.headerButton.isRepeatDisabled,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    enableRepeat: bindActionCreators(headerButton.enableRepeat, dispatch),
    disabledRepeat: bindActionCreators(headerButton.disabledRepeat, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
