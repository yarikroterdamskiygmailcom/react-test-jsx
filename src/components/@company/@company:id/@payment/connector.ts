import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import company from 'src/redux/app/company/action'
import payment from 'src/redux/app/company/payment/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  loading: store.company.loading,
  company: store.company.currentCompany,
  payment: store.payment.payment,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    subscribe: bindActionCreators(payment.subscribe, dispatch),
    unsubscribe: bindActionCreators(payment.unsubscribe, dispatch),
    getCompany: bindActionCreators(company.getCompany, dispatch),
    changeTariff: bindActionCreators(payment.changeTariff, dispatch),
    setPromotionalCode: bindActionCreators(company.setPromotionalCode, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
