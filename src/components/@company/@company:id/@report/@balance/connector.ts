import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  company: store.company.currentCompany,
  companyAccounts: store.company.accounts
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)
