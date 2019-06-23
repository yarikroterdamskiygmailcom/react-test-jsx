import React, { ChangeEvent, MouseEvent } from 'react'
import { JournalAnalyticsData } from 'src/redux/app/types'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import NotFoundDataTable from 'src/components/common/NotFoundDataTable'
import Pagination from '../Pagination'
import Expansion from './Expansion'

interface Props {
  total: number,
  tableFilter: TableFilterState,
  data: JournalAnalyticsData[],
  onRowChoose?: (id: string, operationType: string) => () => void,
  onChangePage: (event: MouseEvent<HTMLButtonElement> | null, value: number) => void,
  onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

const MobileTable = ({ data, total, tableFilter, onRowChoose, onChangePage, onChangeRowsPerPage }: Props) => (
  <div>
    {data && data.length
      ? data.map(value => (
        <Expansion
          key={value._id}
          data={value}
          onRowChoose={onRowChoose && onRowChoose(value._id, value.operationType)}
        />))
      : <NotFoundDataTable />}

    {!!data.length && (
      <Pagination
        total={total}
        tableFilter={tableFilter}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />)}
  </div>
)

export default MobileTable
