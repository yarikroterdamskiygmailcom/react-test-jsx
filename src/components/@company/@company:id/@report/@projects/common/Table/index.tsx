import React, { Component } from 'react'
import { createStyles, Table, withStyles, WithStyles } from '@material-ui/core'
import { OutputJournalAnalyticsData } from 'src/redux/app/types'
import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import { headerProjectsLabels } from 'src/constants'
import Loading from 'src/components/common/Loading'
import connector from './connector'
import TableHead from './Head'
import TableBody from './Body'

const styles = createStyles({
  root: {
    overflowX: 'auto',
    margin: 30,
    '@media (max-width: 1023.98px)': {
      margin: 15,
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  sortedData: any,
  loading: boolean,
  user: User | null,
  company: Company | null,
  actions: {
    getReportsDataForTable: (data: OutputJournalAnalyticsData) => void,
    leaveAnalyticsReportsData: () => void,
    removeReportsProjectData: () => void
  }
}

class ProjectsTable extends Component<Props, {}> {
  public componentDidMount() {
    this.getAnalyticsData()
  }

  public componentWillUnmount() {
    const { leaveAnalyticsReportsData, removeReportsProjectData } = this.props.actions
    leaveAnalyticsReportsData()
    removeReportsProjectData()
  }

  public getAnalyticsData = () => {
    const { user, company, actions } = this.props

    if (company && user) {
      const data = {
        companyId: company._id,
        userId: user.id,
        filters: { operationType: 'profit', reportType: 'P&L' },
        page: 0,
        order: 'desc',
        orderBy: 'date',
        rowsPerPage: 30,
      }

      actions.getReportsDataForTable(data)
    }
  }

  public shouldComponentUpdate(prevProps: Props): boolean {
    return !!prevProps.sortedData.length
  }

  public render() {
    const { sortedData, classes } = this.props
    if (!sortedData.length) return <Loading />

    return (
      <div className={classes.root}>
        <Table>
          <TableHead headerLabels={headerProjectsLabels} />
          <TableBody sortedData={sortedData} />
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(connector(ProjectsTable))
