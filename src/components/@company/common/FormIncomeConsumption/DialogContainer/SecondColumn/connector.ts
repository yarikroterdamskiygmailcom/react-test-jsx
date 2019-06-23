import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  isIncomeOpened: store.ui.headerButton.isIncomeOpened,
  isConsumptionOpened: store.ui.headerButton.isConsumptionOpened,
})

const mapDispatchToProps = () => ({
  actions: {},
})

export default connect(mapStateToProps, mapDispatchToProps)
