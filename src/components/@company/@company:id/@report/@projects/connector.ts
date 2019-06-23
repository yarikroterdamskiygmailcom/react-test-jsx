import { connect } from 'react-redux'
import { AppState } from 'src/redux/app/reducers'

const mapStateToProps = (store: AppState) => ({
  chosenProjectsData: store.reportsAnalytics.chosenProjectsData
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)
