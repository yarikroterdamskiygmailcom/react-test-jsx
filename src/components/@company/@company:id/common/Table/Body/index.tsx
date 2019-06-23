import React, { MouseEvent } from 'react'
import { TableBody } from '@material-ui/core'
import { JournalAnalyticsData } from 'src/redux/app/types'
import Rows from './Rows'

interface Props {
  data: JournalAnalyticsData[],
  onRowChoose?: (id: string, operationType: string) => () => void,
  onSelectRow?: (id: string) => (event: MouseEvent<HTMLTableElement>) => void,
}

const Body = ({ data, onRowChoose, onSelectRow }: Props) => (
  <TableBody>
    {data.map(journalAnalyticsDataValue => (
      <Rows
        data={journalAnalyticsDataValue}
        key={journalAnalyticsDataValue._id}
        onChoose={onRowChoose && onRowChoose(journalAnalyticsDataValue._id, journalAnalyticsDataValue.operationType)}
        onSelect={onSelectRow && onSelectRow(journalAnalyticsDataValue._id)}
      />
    ))}
  </TableBody>
)

export default Body
