import React from 'react'
import { TableHead, TableRow, } from '@material-ui/core'
import HeaderCell from './Cells'

interface Props {
  tableArrayOfDates: string[] | undefined
}

const Head = ({ tableArrayOfDates }: Props) => (
  <TableHead>
    <TableRow>
      {tableArrayOfDates && tableArrayOfDates.map(
        (date, index) => <HeaderCell key={index} date={date} />
      )}
    </TableRow>
  </TableHead>
)

export default Head
