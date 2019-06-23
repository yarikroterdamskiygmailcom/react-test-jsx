import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import reports from 'src/redux/app/reports/action'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    chooseReportsProject: bindActionCreators(reports.chooseReportsProject, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
