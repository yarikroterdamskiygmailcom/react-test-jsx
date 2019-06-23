import React, { Component } from 'react'
import loadable from '@loadable/component'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { createStyles, Hidden, Theme, WithStyles, withStyles } from '@material-ui/core'
import {
  DeleteTransaction,
  JournalAnalyticsData,
  JournalAnalyticsDataKey,
  OutputJournalAnalyticsData,
  SetOperation
} from 'src/redux/app/types'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import { globalStyles } from 'src/styles/global-styles'
import Transactions from 'src/components/common/Transactions'
import ImageRoot from '../common/ImageRoot'
import ChooseScene from './@choose/ChooseScene'
import PaymentScene from './@company:id/@payment/PaymentScene'
import DialogIncomeConsumption from './DialogIncomeConsumption'
import { Props } from './@company:id/CompanyIdLayout'
import DialogTransfer from './DialogTransfer'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: 100,
    height: 'calc(100vh - 100px)',
    background: '#edf5fa',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(99vh - 174px)',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  company: {
    width: '100%',
    height: 'calc(100vh - 100px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(99vh - 174px)',
    },
  },
  transactions: {
    padding: '10px 5px',
    ...globalStyles.alignCenter,
  },
})

export interface CompanyProps extends WithStyles<typeof styles>, RouteComponentProps {
  user: User | null,
  company: Company | null,
  tableFilter: TableFilterState,
  journalData: JournalAnalyticsData | null,
  analyticsData: JournalAnalyticsData | null,
  journalDataPaginated: JournalAnalyticsDataKey | null,
  analyticsDataPaginated: JournalAnalyticsDataKey | null,
  isIncomeOpened: boolean,
  isButtonVisible: boolean,
  isTransferOpened: boolean,
  isConsumptionOpened: boolean,
  actions: {
    closeIncome: () => void,
    closeTransfer: () => void,
    resetInputSum: () => void,
    closeConsumption: () => void,
    leaveCurrentJournalData: () => void,
    leaveCurrentAnalyticsData: () => void,
    setOperation: (data: SetOperation) => void,
    updateTransactionData: (data: SetOperation) => void,
    deleteTransaction: (data: DeleteTransaction) => void,
    getJournalDataPaginated: (data: OutputJournalAnalyticsData) => void,
    getAnalyticsDataPaginated: (data: OutputJournalAnalyticsData) => void,
    getAnalyticsData: (data: OutputJournalAnalyticsData) => void,
  },
}

const CompanyIdLayout = loadable(() => import('./@company:id/CompanyIdLayout'))
const CompanyId = (props: Props) => <CompanyIdLayout {...props} />

class CompanyLayout extends Component<CompanyProps> {
  public componentDidMount(): void {
    const { user, history } = this.props
    if (!user) history.push('/auth/login')
  }

  public handleCloseDialog = () => {
    const { actions, isIncomeOpened, isConsumptionOpened, isTransferOpened } = this.props
    if (isIncomeOpened) actions.closeIncome()
    if (isTransferOpened) actions.closeTransfer()
    if (isConsumptionOpened) actions.closeConsumption()
    actions.leaveCurrentJournalData()
    actions.leaveCurrentAnalyticsData()
    actions.resetInputSum()
  }

  public getPaginatedJournalData = () => {
    const { user, company, tableFilter } = this.props
    if (company && user) {
      return {
        companyId: company._id,
        userId: user.id,
        filters: tableFilter.filters,
        page: tableFilter.page,
        order: tableFilter.order,
        orderBy: tableFilter.orderBy,
        rowsPerPage: tableFilter.rowsPerPage,
      }
    }
    return null
  }

  public handleSubmit = async (data: SetOperation): Promise<void> => {
    const { journalData, analyticsData, journalDataPaginated, analyticsDataPaginated, actions } = this.props
    if (journalData || analyticsData) {
      await actions.updateTransactionData(data)
    } else {
      await actions.setOperation(data)
    }

    this.handleCloseDialog()

    if (journalDataPaginated) await actions.getJournalDataPaginated(this.getPaginatedJournalData()!)
    if (analyticsDataPaginated) {
      await actions.getAnalyticsData(this.getPaginatedJournalData()!)
      await actions.getAnalyticsDataPaginated(this.getPaginatedJournalData()!)
    }
  }

  public handleDelete = async () => {
    const { user, company, journalData, analyticsData, actions } = this.props
    const data = journalData || analyticsData

    if (company && user && data) {
      const deleteData = {
        user_id: user.id,
        company_id: company._id,
        transaction_id: data._id,
      }

      await actions.deleteTransaction(deleteData)

      this.handleCloseDialog()

      if (journalData) await actions.getJournalDataPaginated(this.getPaginatedJournalData()!)
      if (analyticsData) {
        await actions.getAnalyticsData(this.getPaginatedJournalData()!)
        await actions.getAnalyticsDataPaginated(this.getPaginatedJournalData()!)
      }
    }
  }

  public render() {
    const { classes, company, isButtonVisible, isIncomeOpened, isConsumptionOpened, isTransferOpened } = this.props

    return (
      <div className={classes.root}>
        {company && isButtonVisible && (
          <Hidden mdUp implementation="css" className={classes.transactions}>
            <Transactions />
          </Hidden>)}

        <ImageRoot />

        <div className={classes.container}>
          <div className={classes.company}>
            <Switch>
              <Route exact path="/company/choose" component={ChooseScene} />
              <Route exact path="/company/:id/payment" component={PaymentScene} />
              <Route path="/company/:id" component={CompanyId} />

              <Redirect to="/company/choose" />
            </Switch>
          </div>
        </div>

        <DialogIncomeConsumption
          isIncomeOpened={isIncomeOpened}
          isConsumptionOpened={isConsumptionOpened}
          onCloseDialog={this.handleCloseDialog}
          onSubmit={this.handleSubmit}
          onDelete={this.handleDelete}
        />

        <DialogTransfer
          isOpened={isTransferOpened}
          onSubmit={this.handleSubmit}
          onDelete={this.handleDelete}
          onCloseDialog={this.handleCloseDialog}
        />
      </div>
    )
  }
}

export default withStyles(styles)(connector(CompanyLayout))
