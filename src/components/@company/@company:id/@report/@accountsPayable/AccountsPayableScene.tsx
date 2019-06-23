import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'
import _ from 'lodash'
import InformationOutline from 'mdi-react/InformationOutlineIcon'
import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import { globalStyles } from 'src/styles/global-styles'
import { RowOrPage, TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { JournalAnalyticsData, OutputJournalAnalyticsData } from 'src/redux/app/types'
import MobileTable from 'src/components/@company/@company:id/common/MobileTable'
import { TableCounterpartyType } from 'src/redux/app/reports/receivables/types'
import generateReceivablesData from 'src/utils/generateReceivablesData'
import Table from 'src/components/@company/@company:id/common/Table'
import { informationLabels, reportIconSize } from 'src/constants'

import RPTable from '../common/Receivables&AccountsPayableTable'
import Loading from 'src/components/common/Loading'
import ReportLink from '../common/Link/ReportLink'
import connector from './connector'
import CustomTooltip from 'src/components/common/Tooltip'

const styles = createStyles({
  root: {
    width: 'calc(100vw - 375px)',
    marginLeft: 30,
    '@media (max-width: 1279.98px)': {
      width: 'calc(100vw - 340px)',
    },
    '@media (max-width: 1023.98px)': {
      width: '100vw',
      margin: 0,
    }
  },
  containerLink: {
    ...globalStyles.flexBetween,
  },
  links: {
    margin: '20px 0 20px 30px',
    '@media (max-width: 1023.98px)': {
      margin: '20px 0 20px 15px'
    },
  },
  balanceOuter: {
    display: 'inline-block',
    margin: '10px 30px',
    padding: '7px 15px',
    border: '1px solid #b6b9aa',
    borderRadius: 15,
    '@media (max-width: 1399.98px)': {
      marginLeft: 30,
    },
    '@media (max-width: 1023.98px)': {
      marginLeft: 15,
    },
  },
  balance: {
    fontWeight: 700,
    fontSize: 16,
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 12,
    },
  },
  desktop: {
    ...globalStyles.desktop,
  },
  mobile: {
    ...globalStyles.mobile,
  },
})

interface AccountPayableProps extends WithStyles<typeof styles> {
  loading: boolean,
  user: User | null,
  company: Company | null,
  tableFilter: TableFilterState,
  journalData: [JournalAnalyticsData] | null,
  chosenCounterparty: TableCounterpartyType | null,
  isTransferOpened: boolean,
  actions: {
    getReceivablesData: (data: OutputJournalAnalyticsData) => void,
    changeRowOrPage: (rowOrPage: RowOrPage) => void,
    sortTable: (orderBy: string) => void,
    removeReceivablesData: () => void,
    removeCounterparty: () => void,
  }
}

class AccountPayable extends Component<AccountPayableProps, {}> {

  public componentDidMount() {
    this.getTableData()
  }

  public componentDidUpdate(prevProps: AccountPayableProps) {
    const { removeCounterparty } = this.props.actions
    return prevProps.isTransferOpened &&
      removeCounterparty() &&
      this.getTableData()
  }

  public componentWillUnmount() {
    const { removeCounterparty, removeReceivablesData } = this.props.actions
    removeCounterparty()
    removeReceivablesData()
  }

  public getTableData = (props?: RowOrPage) => {
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

      actions.getReceivablesData(data)
    }
  }

  public handleSubmit = async (submit: RowOrPage): Promise<void> => {
    const { actions } = this.props
    await actions.changeRowOrPage(submit)
    this.getTableData(submit)
  }

  public handleSortTable = (name: string) => async () => {
    const { actions } = this.props
    await actions.sortTable(name)

    this.getTableData()
  }

  public handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, value: number) => {
    if (event) {
      this.handleSubmit({ page: value })
    }
  }

  public handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.handleSubmit({ rowsPerPage: +event.target.value })
  }

  public render() {
    const { classes, journalData, chosenCounterparty, company, loading, tableFilter } = this.props

    const accountsPayable = _.filter(generateReceivablesData(journalData), el => el.counterpartyTo) as unknown | TableCounterpartyType[]
    const accountsPayableData = accountsPayable as TableCounterpartyType[]

    const totalSum = _.round(
      accountsPayableData.length && accountsPayableData
        .reduce((acc, val) => (acc += val.sum), 0),
      2)

    const currencySymbol = company!.currency.symbol

    if (loading) return <Loading />

    return (
      <div className={classes.root}>
        <div className={classes.containerLink}>
          <div className={classes.links}>
            <ReportLink path="">
              Все отчеты
            </ReportLink>{' / '}
            <ReportLink path="/accounts_payable">
              Кредиторка
            </ReportLink>
            <CustomTooltip text={informationLabels[3]} bottom>
              <InformationOutline size={reportIconSize} />
            </CustomTooltip>
          </div>

          <div className={classes.balanceOuter}>
            <Typography variant="subtitle1" className={classes.balance}>
              Сумма: {totalSum.toLocaleString('ru')} {currencySymbol}
            </Typography>
          </div>
        </div>

        <RPTable
          getTableData={this.getTableData}
          tableData={accountsPayableData}
          currency={currencySymbol}
          buttonLabel={'Погасить'}
        />

        {chosenCounterparty && (
          <>
            <div className={classes.desktop}>
              <Table
                tableFilter={tableFilter}
                onTableSort={this.handleSortTable}
                data={chosenCounterparty.tableData}
                onChangePage={this.handleChangePage}
                total={chosenCounterparty.tableData.length}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </div>

            <div className={classes.mobile}>
              <MobileTable
                tableFilter={tableFilter}
                data={chosenCounterparty.tableData}
                onChangePage={this.handleChangePage}
                total={chosenCounterparty.tableData.length}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </div>
          </>)}
      </div>
    )
  }
}

export default withStyles(styles)(connector(AccountPayable))
