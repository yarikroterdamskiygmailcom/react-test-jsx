import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Theme, withStyles, WithStyles } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import _ from 'lodash'

import { globalStyles } from 'src/styles/global-styles'
import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import { DeleteTransaction, FiltersData, JournalAnalyticsData, OutputJournalAnalyticsData } from 'src/redux/app/types'
import { RowOrPage, TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { ChosenProjectsData } from 'src/redux/app/reports/types'

import FiltersAnalytics from 'src/components/@company/@company:id/common/FiltersAnalytics'
import Charts from 'src/components/@company/@company:id/@analytics/common/Charts'
import Table from 'src/components/@company/@company:id/common/Table/index'
import MobileTable from 'src/components/@company/@company:id/common/MobileTable/index'
import Loading from 'src/components/common/Loading'
import connector from './connector'

const styles = (theme: Theme) => ({
  ...globalStyles,
  root: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  projects: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 50,
    marginBottom: 50,
    paddingTop: 30,
    paddingBottom: 50,
    margin: 30,
    '@media (max-width: 1100px)': {
      margin: 15,
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 30,
    },
  },
  projectsTableDesktop: {
    ...globalStyles.desktop,
    backgroundColor: '#EDF5FA',
  },
  chartsHeader: {
    ...globalStyles.flexBetween,
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,

    '@media (max-width: 699.98px)': {
      flexDirection: 'column',
    } as CSSProperties,

    '@media (max-width: 499.98px)': {
      marginLeft: 20,
      marginRight: 20,
    },
  },
  chartsHeaderName: {
    font: '500 16px Gotham Pro',
    '@media (max-width: 699.98px)': {
      margin: '5px auto'
    },
    '@media (max-width: 1023.98px)': {
      font: '500 14px Gotham Pro',
    },
  },
  chartsHeaderData: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '50%',
    '@media (max-width: 699.98px)': {
      flexDirection: 'column',
      margin: '5px auto',
      width: '70%',
    } as CSSProperties,
  },
  chartsHeaderProfit: {
    font: '500 16px Gotham Pro',
    maxHeight: 43,
    borderRadius: 10,
    marginRight: '5%',
    padding: '12px 20px',
    border: '1px solid #b6b9aa',
    '@media (max-width: 1279.98px)': {
      font: '500 13px Gotham Pro',
      padding: '6px 10px',
      margin: 'auto 5% auto 0',
    },
    '@media (max-width: 699.98px)': {
      font: '500 12px Gotham Pro',
      padding: '6px 10px',
      margin: 'auto',
    },
  },
  chartsHeaderProfitability: {
    font: '16px Gotham Pro',
    fontWeight: 500,
    maxHeight: 43,
    borderRadius: 10,
    padding: '12px 20px',
    border: '1px solid #b6b9aa',
    '@media (max-width: 1279.98px)': {
      font: '500 13px Gotham Pro',
      padding: '6px 10px',
      margin: 'auto 0',
    },
    '@media (max-width: 699.98px)': {
      font: '500 12px Gotham Pro',
      padding: '6px 10px',
      margin: 'auto',
    },
  }
})

interface Props extends WithStyles<typeof styles> {
  isForProjects?: boolean,
  loading: boolean,
  total: number,
  user: User | null,
  isSelectedAll: boolean,
  company: Company | null,
  tableFilter: TableFilterState,
  analyticsDataPaginated: [JournalAnalyticsData] | null,
  chosenProjectsData: ChosenProjectsData | null,
  actions: {
    sortTable: (orderBy: string) => void,

    deleteReportsTransaction: (data: DeleteTransaction) => void,
    getReportsDataPaginated: (data: OutputJournalAnalyticsData) => void,
    getReportsData: (data: OutputJournalAnalyticsData) => void,

    leaveAnalyticsData: () => void,

    selectedRowReports: (id: string) => void,
    selectedAllReports: () => void,

    resetOnlyFilters: () => void,
    outputAnalyticsFilters: (filtersData: FiltersData) => void,

    changeRowOrPage: (rowOrPage: RowOrPage) => void,
  },
}

class ProjectsCharts extends Component<Props> {
  public componentDidMount() {
    const { resetOnlyFilters } = this.props.actions
    resetOnlyFilters()
    this.getReportsData()
  }

  public componentWillUnmount() {
    const { leaveAnalyticsData, resetOnlyFilters } = this.props.actions
    resetOnlyFilters()
    leaveAnalyticsData()
  }

  public getReportsData = (props?: RowOrPage) => {
    const { user, company, tableFilter, actions, chosenProjectsData } = this.props

    const page = props && props.page
    const rowsPerPage = props && props.rowsPerPage

    const checkedProjects = chosenProjectsData &&
      _.reduce<string, { [key: string]: boolean }>(chosenProjectsData.ids, (acc, val) => {
        acc[val] = false
        return acc
      },                                           {})

    if (company && user && chosenProjectsData) {
      const data = {
        ...tableFilter,
        companyId: company._id,
        userId: user.id,
        filters: {
          operationType: 'income',
          reportType: 'P&L',
          checkedProjects: {
            ...checkedProjects,
            [chosenProjectsData.id]: true
          }
        },
        page: page === 0 ? page : (page || tableFilter.page),
        rowsPerPage: rowsPerPage || tableFilter.rowsPerPage,
        order: tableFilter.order,
        orderBy: tableFilter.orderBy,
      }

      actions.resetOnlyFilters()
      actions.getReportsDataPaginated(data)
      actions.getReportsData(data)
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.chosenProjectsData !== prevProps.chosenProjectsData) {
      this.getReportsData()
    }
  }

  public handleSubmit = async (submit: RowOrPage): Promise<void> => {
    const { actions } = this.props
    await actions.changeRowOrPage(submit)
    this.getReportsData(submit)
  }

  public handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, value: number) => {
    if (event) {
      this.handleSubmit({ page: value })
    }
  }

  public handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.handleSubmit({ rowsPerPage: +event.target.value })
  }

  public handleSelectRow = (id: string) => (event: MouseEvent<HTMLTableElement>) => {
    const { selectedRowReports } = this.props.actions
    selectedRowReports(id)

    event.stopPropagation()
  }

  public handleSelectedAll = () => {
    const { selectedAllReports } = this.props.actions
    selectedAllReports()
  }

  public handleDeleteSelected = async () => {
    const { user, company, analyticsDataPaginated, actions } = this.props

    if (analyticsDataPaginated) {
      analyticsDataPaginated.filter(value => value.selected).map(async (value: JournalAnalyticsData) => {
        if (company && user) {
          const deleteData = {
            user_id: user.id,
            company_id: company._id,
            transaction_id: value._id,
          }

          await actions.deleteReportsTransaction(deleteData)
          this.getReportsData()
        }
      })
    }

    this.getReportsData()
  }

  public handleSortTable = (name: string) => async () => {
    const { actions } = this.props
    await actions.sortTable(name)

    this.getReportsData()
  }

  public render() {
    const { classes, loading, analyticsDataPaginated, total, isSelectedAll, tableFilter, isForProjects, chosenProjectsData } = this.props
    if (loading) return <Loading />

    return (
      <div className={classes.root}>
        <div className={isForProjects ? classes.projects : undefined}>
          {chosenProjectsData && isForProjects ? (
            <div className={classes.chartsHeader}>
              <p className={classes.chartsHeaderName}>{chosenProjectsData.name}</p>
              <div className={classes.chartsHeaderData}>
                <p
                  style={{ whiteSpace: 'nowrap' }}
                  className={classes.chartsHeaderProfit}
                >Прибыль: {chosenProjectsData.profit.toLocaleString('ru')} $
                </p>
                <p
                  style={{ whiteSpace: 'nowrap' }}
                  className={classes.chartsHeaderProfitability}
                >Рентабельность: {chosenProjectsData.profitability} %
                </p>
              </div>
            </div>
          ) : null}

          <FiltersAnalytics />

          <Charts filters={tableFilter.filters} reportsProject={true} />
        </div>
        <div className={isForProjects ? classes.projectsTableDesktop : classes.desktop}>
          <Table
            total={total}
            data={analyticsDataPaginated ? analyticsDataPaginated : []}
            tableFilter={tableFilter}
            isSelectedAll={isSelectedAll}
            isForProjects={isForProjects}
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
            total={total}
            data={analyticsDataPaginated ? analyticsDataPaginated : []}
            tableFilter={tableFilter}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(connector(ProjectsCharts))
