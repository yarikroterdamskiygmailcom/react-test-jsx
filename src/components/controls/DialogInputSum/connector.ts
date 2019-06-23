import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import currency from 'src/redux/app/currency/action'

const mapStateToProps = (store: AppState) => ({
  inputSum: store.currency.inputSum,
  company: store.company.currentCompany,
  exchangeRate: store.currency.exchangeRate,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    changeSum: bindActionCreators(currency.changeSum, dispatch),
    changeExchangeRate: bindActionCreators(currency.changeExchangeRate, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
