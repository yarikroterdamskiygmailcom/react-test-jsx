import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import company from 'src/redux/app/company/action'
import currency from 'src/redux/app/currency/action'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  loading: store.company.loading,
  companies: store.company.companies,
  currencies: store.currency.currencies,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getCompanies: bindActionCreators(company.getCompanies, dispatch),
    getCurrencies: bindActionCreators(currency.getCurrencies, dispatch),
    createCompany: bindActionCreators(company.createCompany, dispatch),
    deleteCompany: bindActionCreators(company.deleteCompany, dispatch),
    createDemoCompany: bindActionCreators(company.createDemoCompany, dispatch),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)
