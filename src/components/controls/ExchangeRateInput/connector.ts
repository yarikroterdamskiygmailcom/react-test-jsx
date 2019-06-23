import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import currency from 'src/redux/app/currency/action'

const mapStateToProps = (store: AppState) => ({
  exchangeRate: store.currency.exchangeRate,
  company: store.company.currentCompany,
  inputSum: store.currency.inputSum,
  inputNewSum: store.currency.inputNewSum,
  inputExchangeRate: store.currency.inputExchangeRate,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    changeNewSum: bindActionCreators(currency.changeNewSum, dispatch),
    changeExchangeRate: bindActionCreators(currency.changeExchangeRate, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
