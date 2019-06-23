import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import currency from 'src/redux/app/currency/action'

const mapStateToProps = (store: AppState) => ({
  company: store.company.currentCompany,
  exchangeRate: store.currency.exchangeRate,
  inputExchangeRate: store.currency.inputExchangeRate,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    changeExchangeRate: bindActionCreators(currency.changeExchangeRate, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
