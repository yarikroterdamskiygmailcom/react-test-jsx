import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'
import { bindActionCreators, Dispatch } from 'redux'
import company from 'src/redux/app/company/action'
import currency from 'src/redux/app/currency/action'
import secondary from 'src/redux/app/ui/secondaryData/action'

const mapStateToProps = (store: AppState) => ({
  user: store.auth.user,
  loading: store.company.loading,
  company: store.company.currentCompany,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getCompany: bindActionCreators(company.getCompany, dispatch),
    leaveCompany: bindActionCreators(company.leaveCompany, dispatch),
    getExchangeRates: bindActionCreators(currency.getExchangeRates, dispatch),
    getSchedulePeriods: bindActionCreators(secondary.getSchedulePeriods, dispatch),
    getCompanyAccounts: bindActionCreators(company.getCompanyAccounts, dispatch),
    getFiltersData: bindActionCreators(secondary.getFiltersData, dispatch),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
