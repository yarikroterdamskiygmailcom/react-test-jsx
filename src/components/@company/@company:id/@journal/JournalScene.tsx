import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Hidden } from '@material-ui/core'
import {
  DeleteTransaction,
  FiltersData,
  JournalAnalyticsData,
  JournalAnalyticsDataKey,
  OutputJournalAnalyticsData,
} from 'src/redux/app/types'
import { RowOrPage, TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { consumption, income, transfer } from 'src/constants'
import { Company } from 'src/redux/app/company/types'
import Loading from 'src/components/common/Loading'
import { User } from 'src/redux/app/auth/types'
import MobileTable from '../common/MobileTable'
import Filters from '../common/FiltersJournal'
import Table from '../common/Table'
import connector from './connector'

interface Props {
  total: number,
  loading: boolean,
  user: User | null,
  isSelectedAll: boolean,
  company: Company | null,
  filtersData: FiltersData | null,
  tableFilter: TableFilterState,
  journalData: JournalAnalyticsDataKey | null,
  actions: {
    sortTable: (orderBy: string) => void,
    getComponentRef: (data: object | null) => void,

    leaveJournalData: () => void,
    leaveCurrentJournalData: () => void,

    getJournalDataPaginated: (data: OutputJournalAnalyticsData) => void,
    deleteJournalTransaction: (data: DeleteTransaction) => void,

    changeRowOrPage: (rowOrPage: RowOrPage) => void,
    chooseRowJournal: (id: string) => void,

    selectAllJournal: () => void,
    selectedRowJournal: (id: string) => void,

    openIncome: () => void,
    openTransfer: () => void,
    openConsumption: () => void,
  },
}

class JournalScene extends Component<Props> {
  public componentRef: any

  public componentDidMount(): void {
    this.getJournalData()
  }

  public componentWillUnmount(): void {
    const { actions } = this.props
    actions.leaveJournalData()
    actions.leaveCurrentJournalData()
  }

  public getJournalData = async (rowOrPage?: RowOrPage) => {
    const { user, company, tableFilter, actions } = this.props
    const rowsPerPage = rowOrPage && rowOrPage.rowsPerPage

    const pageScene = rowOrPage && rowOrPage.page
    const page = pageScene === 0 ? pageScene : (pageScene || tableFilter.page)

    if (company && user) {
      const data = {
        page,
        companyId: company._id,
        userId: user.id,
        order: tableFilter.order,
        orderBy: tableFilter.orderBy,
        filters: tableFilter.filters,
        rowsPerPage: rowsPerPage || tableFilter.rowsPerPage,
      }

      await actions.getJournalDataPaginated(data)
    }
  }

  public handleSubmit = async (submit: RowOrPage): Promise<void> => {
    const { actions } = this.props
    await actions.changeRowOrPage(submit)
    this.getJournalData(submit)
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
    const { chooseRowJournal, openIncome, openConsumption, openTransfer } = this.props.actions
    chooseRowJournal(id)

    if (operationType === income) openIncome()
    if (operationType === transfer) openTransfer()
    if (operationType === consumption) openConsumption()
  }

  public handleSelectRow = (id: string) => (event: MouseEvent<HTMLTableElement>) => {
    const { selectedRowJournal } = this.props.actions
    selectedRowJournal(id)

    event.stopPropagation()
  }

  public handleSelectedAll = () => {
    const { selectAllJournal } = this.props.actions
    selectAllJournal()
  }

  public handleDeleteSelected = async () => {
    const { user, company, journalData, actions } = this.props
    if (journalData) {
      Object.values(journalData).filter(value => value.selected).map(async (value: JournalAnalyticsData) => {
        if (company && user) {
          const deleteData = {
            user_id: user.id,
            company_id: company._id,
            transaction_id: value._id,
          }

          await actions.deleteJournalTransaction(deleteData)
          this.getJournalData()
        }
      })

      this.getJournalData()
    }
  }

  public handleSortTable = (name: string) => async () => {
    const { actions } = this.props
    await actions.sortTable(name)

    this.getJournalData()
  }

  public handleRefComponent = (el: object | null) => {
    const { actions } = this.props
    actions.getComponentRef(el)
  }

  public render() {
    const { total, tableFilter, loading, journalData, isSelectedAll } = this.props
    if (loading) return <Loading />

    const data = journalData ? Object.values(journalData) : []

    return (
      <div>
        <Filters />

        <Hidden smDown implementation="css">
          <div ref={this.handleRefComponent}>
            <Table
              data={data}
              total={total}
              tableFilter={tableFilter}
              isSelectedAll={isSelectedAll}
              onRowChoose={this.handleChooseRow}
              onSelectRow={this.handleSelectRow}
              onTableSort={this.handleSortTable}
              onChangePage={this.handleChangePage}
              onSelectAll={this.handleSelectedAll}
              onDeleteSelected={this.handleDeleteSelected}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        </Hidden>

        <Hidden mdUp implementation="css">
          <MobileTable
            data={data}
            total={total}
            tableFilter={tableFilter}
            onRowChoose={this.handleChooseRow}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Hidden>
      </div>
    )
  }
}

export default connector(JournalScene)
