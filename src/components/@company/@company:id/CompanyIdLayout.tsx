import React, { Component } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { createStyles, Hidden, Theme, WithStyles, withStyles } from '@material-ui/core'
import CompanyNotFound from 'src/components/common/CompanyNotFound'
import { GetFiltersData } from 'src/redux/app/ui/secondaryData/types'
import { globalStyles } from 'src/styles/global-styles'
import { User } from 'src/redux/app/auth/types'
import { Company, GetCompany } from 'src/redux/app/company/types'
import Loading from 'src/components/common/Loading'
import JournalScene from './@journal/JournalScene'
import AnalyticsScene from './@analytics/AnalyticsScene'
import ProjectsScene from './@report/@projects/ProjectsScene'
import AccountsPayable from './@report/@accountsPayable/AccountsPayableScene'
import Receivables from './@report/@receivables/ReceivablesScene'
import CalendarScene from './@calendar/CalendarScene'
import UsersScene from './@users/UsersScene'
import ApiScene from './@api/ApiScene'
import ReportScene from './@report/ReportsScene'
import PandL from './@report/@pandL/PandLScene'
import Balance from './@report/@balance/BalanceScene'
import CashFlow from './@report/@cashFlow/CashFlowScene'
import SettingsScene from './@settings/SettingsScene'
import CompanyData from './common/CompanyData'
import Navigation from './common/Navigation'
import Drawer from './common/Drawer'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
  },
  container: {
    display: 'flex',
    height: '100%',
    minHeight: 'calc(99vh - 100px)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(99vh - 174px)',
    },
  },
  router: {
    ...globalStyles.fullWidth,
    overflowX: 'hidden',
    marginLeft: 300,
    [theme.breakpoints.down('md')]: {
      marginLeft: 265,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  marRight: {
    marginRight: 1,
  },
})

interface Identifiable {
  id: string,
}

export interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  loading: boolean,
  user: User | null,
  company: Company | null,
  actions: {
    leaveCompany: () => void,
    getExchangeRates: () => void,
    getSchedulePeriods: () => void,
    getCompanyAccounts: (form: GetCompany) => void,
    getCompany: (form: GetCompany, isButtonVisible: boolean) => void,
    getFiltersData: (data: GetFiltersData) => void,
  },
}

class CompanyIdLayout extends Component<Props> {
  public componentDidMount(): void {
    this.logoutUser()

    this.getCompany()
    this.getCompanyAccounts()
    this.getExchangeRates()
    this.getSchedulePeriods()
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>): void {
    if (nextProps.company && nextProps.company !== this.props.company) {
      this.getFiltersData(nextProps.company)
    }
  }

  public componentWillUnmount(): void {
    const { actions } = this.props
    actions.leaveCompany()
  }

  public logoutUser = () => {
    const { user, history } = this.props
    if (!user) history.push('/auth/login')
  }

  public getCompany = async () => {
    const { actions, user, match } = this.props
    if (user) {
      await actions.getCompany(
        { company_id: (match.params as Identifiable).id, user_id: user.id },
        true)
    }
  }

  public getCompanyAccounts = async () => {
    const { actions, user, match } = this.props
    if (user) {
      await actions.getCompanyAccounts({ company_id: (match.params as Identifiable).id, user_id: user.id })
    }
  }

  public getExchangeRates = () => {
    const { actions } = this.props
    actions.getExchangeRates()
  }

  public getSchedulePeriods = () => {
    const { actions } = this.props
    actions.getSchedulePeriods()
  }

  public getFiltersData = async (company: Company) => {
    const { user, actions } = this.props
    if (user) {
      const data = {
        user_id: user.id,
        company_id: company._id,
        role_id: company.users[0].role_id,
      }

      await actions.getFiltersData(data)
    }
  }

  public render() {
    const { loading, company, classes } = this.props

    if (loading) return <Loading />
    if (!company) return <CompanyNotFound />

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Hidden smDown implementation="css" className={classes.marRight}>
            <CompanyData />
          </Hidden>

          <div className={classes.router}>
            <Navigation />

            <Switch>
              <Route exact path="/company/:id/journal" component={JournalScene} />
              <Route exact path="/company/:id/analytics" component={AnalyticsScene} />
              <Route exact path="/company/:id/report" component={ReportScene} />
              <Route exact path="/company/:id/calendar" component={CalendarScene} />
              <Route exact path="/company/:id/users" component={UsersScene} />
              <Route exact path="/company/:id/settings" component={SettingsScene} />
              <Route exact path="/company/:id/api" component={ApiScene} />
              <Route path="/company/:id/report/profit_and_loss_statement" component={PandL} />
              <Route path="/company/:id/report/cash_flow" component={CashFlow} />
              <Route path="/company/:id/report/receivables" component={Receivables} />
              <Route path="/company/:id/report/accounts_payable" component={AccountsPayable} />
              <Route path="/company/:id/report/balance" component={Balance} />
              <Route path="/company/:id/report/projects_report" component={ProjectsScene} />
              <Route path="/company/:id/report/custom_reports" component={ProjectsScene} />

              <Redirect to="/company/:id/journal" />
            </Switch>
          </div>
        </div>

        <Drawer />
      </div>
    )
  }
}

export default withStyles(styles)(connector(CompanyIdLayout))
