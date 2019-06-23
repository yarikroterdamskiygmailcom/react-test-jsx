import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Theme, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import {
  DeleteTransaction,
  FiltersData,
  JournalAnalyticsData,
  JournalAnalyticsDataKey,
  OutputJournalAnalyticsData
} from 'src/redux/app/types'
import { RowOrPage, TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { consumption, income, transfer } from 'src/constants'
import FiltersAnalytics from '../common/FiltersAnalytics'
import Loading from 'src/components/common/Loading'
import MobileTable from '../common/MobileTable'
import Charts from './common/Charts/index'
import Table from '../common/Table'
import connector from './connector'

const styles = (theme: Theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  desktop: {
    ...globalStyles.desktop,
  },
  mobile: {
    ...globalStyles.mobile,
  },
})

interface AnalyticsSceneProps extends WithStyles<typeof styles> {
  total: number,
  loading: boolean,
  user: User | null,
  isSelectedAll: boolean,
  company: Company | null,
  filtersData: FiltersData | null,
  tableFilter: TableFilterState,
  analyticsData: [JournalAnalyticsData] | null,
  analyticsDataPaginated: JournalAnalyticsDataKey | null,
  actions: {
    sortTable: (orderBy: string) => void,

    deleteAnalyticsTransaction: (data: DeleteTransaction) => void,
    getAnalyticsDataPaginated: (data: OutputJournalAnalyticsData) => void,
    getAnalyticsData: (data: OutputJournalAnalyticsData) => void,

    leaveCurrentAnalyticsData: () => void,
    leaveAnalyticsData: () => void,

    selectedRowAnalytics: (id: string) => void,
    selectedAllAnalytics: () => void,

    changeRowOrPage: (rowOrPage: RowOrPage) => void,
    chooseRowAnalytics: (id: string) => void,

    openIncome: () => void,
    openTransfer: () => void,
    openConsumption: () => void,
  },
}

class AnalyticsScene extends Component<AnalyticsSceneProps> {
  public componentDidMount() {
    this.getAnalyticsData()
  }

  public componentWillUnmount() {
    const { leaveAnalyticsData, leaveCurrentAnalyticsData } = this.props.actions
    leaveCurrentAnalyticsData()
    leaveAnalyticsData()
  }

  public getAnalyticsData = (props?: RowOrPage) => {
    const { user, company, tableFilter, actions } = this.props

    const page = props && props.page
    const rowsPerPage = props && props.rowsPerPage

    if (company && user) {
      const data = {
        companyId: company._id,
        userId: user.id,
        order: tableFilter.order,
        orderBy: tableFilter.orderBy,
        filters: tableFilter.filters,
        page: page === 0 ? page : (page || tableFilter.page),
        rowsPerPage: rowsPerPage || tableFilter.rowsPerPage,
      }

      actions.getAnalyticsData(data)
      actions.getAnalyticsDataPaginated(data)
    }

    return null
  }

  public handleSubmit = async (submit: RowOrPage): Promise<void> => {
    const { actions } = this.props
    await actions.changeRowOrPage(submit)
    this.getAnalyticsData(submit)
  }

  public handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, value: number) => {
    if (event) {
      this.handleSubmit({ page: value })
    }
  }

  public handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.handleSubmit({ rowsPerPage: +event.target.value })
  }

  public handleChooseRow = (id: string, operationType: string) => () => {
    const { chooseRowAnalytics, openIncome, openConsumption, openTransfer } = this.props.actions
    chooseRowAnalytics(id)

    if (operationType === income) openIncome()
    if (operationType === transfer) openTransfer()
    if (operationType === consumption) openConsumption()
  }

  public handleSelectRow = (id: string) => (event: MouseEvent<HTMLTableElement>) => {
    const { selectedRowAnalytics } = this.props.actions
    selectedRowAnalytics(id)

    event.stopPropagation()
  }

  public handleSelectedAll = () => {
    const { selectedAllAnalytics } = this.props.actions
    selectedAllAnalytics()
  }

  public handleDeleteSelected = async () => {
    const { user, company, analyticsData, actions } = this.props

    if (analyticsData) {
      analyticsData.filter(value => value.selected).map(async (value: JournalAnalyticsData) => {
        if (company && user) {
          const deleteData = {
            user_id: user.id,
            company_id: company._id,
            transaction_id: value._id,
          }

          await actions.deleteAnalyticsTransaction(deleteData)
          this.getAnalyticsData()
        }
      })
    }

    this.getAnalyticsData()
  }

  public handleSortTable = (name: string) => async () => {
    const { actions } = this.props
    await actions.sortTable(name)

    this.getAnalyticsData()
  }

  public render() {
    const { classes, total, loading, tableFilter, isSelectedAll, analyticsDataPaginated } = this.props
    if (loading) return <Loading />

    const data = analyticsDataPaginated ? Object.values(analyticsDataPaginated) : []

    return (
      <div className={classes.root}>
        <FiltersAnalytics />

        <Charts filters={tableFilter.filters} />

        <div className={classes.desktop}>
          <Table
            data={data}
            total={total}
            tableFilter={tableFilter}
            isSelectedAll={isSelectedAll}
            onRowChoose={this.handleChooseRow}
            onSelectRow={this.handleSelectRow}
            onTableSort={this.handleSortTable}
            onSelectAll={this.handleSelectedAll}
            onChangePage={this.handleChangePage}
            onDeleteSelected={this.handleDeleteSelected}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>

        <div className={classes.mobile}>
          <MobileTable
            data={data}
            total={total}
            tableFilter={tableFilter}
            onRowChoose={this.handleChooseRow}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(connector(AnalyticsScene))
