import React, { ChangeEvent, MouseEvent } from 'react'
import { createStyles, Table as MaterialTable, WithStyles, withStyles } from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import NotFoundDataTable from 'src/components/common/NotFoundDataTable'
import Pagination from '../Pagination'
import Header from './Head'
import Body from './Body'

const styles = createStyles({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: 1,
    background: '#f6fafd',
  },
  forProject: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f6fafd'
  }
})

interface Props extends WithStyles<typeof styles> {
  total: number,
  isSelectedAll?: boolean,
  isForProjects?: boolean,
  tableFilter: TableFilterState,
  data: JournalAnalyticsData[],
  onSelectAll?: () => void,
  onDeleteSelected?: () => void,
  onTableSort: (name: string) => () => void,
  onRowChoose?: (id: string, operationType: string) => () => void,
  onSelectRow?: (id: string) => (event: MouseEvent<HTMLTableElement>) => void,
  onChangePage: (event: MouseEvent<HTMLButtonElement> | null, value: number) => void,
  onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

const Table = ({
  classes,
  data,
  total,
  tableFilter,
  onTableSort,
  onChangePage,
  isSelectedAll,
  onRowChoose,
  onSelectRow,
  onSelectAll,
  isForProjects,
  onDeleteSelected,
  onChangeRowsPerPage,
}: Props) => (
  <div className={isForProjects ? classes.forProject : classes.root}>
    <MaterialTable>
      <Header
        data={data}
        tableFilter={tableFilter}
        onSelectAll={onSelectAll}
        onTableSort={onTableSort}
        isSelectedAll={isSelectedAll}
        onDeleteSelected={onDeleteSelected}
      />

      {data && !!data.length && (
        <Body data={data} onRowChoose={onRowChoose} onSelectRow={onSelectRow} />)}
    </MaterialTable>

    {!data || !data.length && <NotFoundDataTable />}

    {data && !!data.length && (
      <Pagination
        total={total}
        tableFilter={tableFilter}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />)}
  </div>
)

export default withStyles(styles)(Table)
