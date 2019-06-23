import React, { ChangeEvent, MouseEvent } from 'react'
import { createStyles, TablePagination, WithStyles, withStyles } from '@material-ui/core'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { rowsPerPageOptions } from 'src/constants'

const styles = createStyles({
  select: {
    paddingRight: 22,
    fontSize: 13,
    marginTop: 2,
  },
  selectRoot: {
    marginLeft: 0,
    marginRight: 20,
  },
  actions: {
    marginLeft: 0,
    padding: 0,
  },
  caption: {
    fontSize: 13,
  },
})

interface Props extends WithStyles<typeof styles> {
  total: number,
  tableFilter: TableFilterState,
  onChangePage: (event: MouseEvent<HTMLButtonElement> | null, value: number) => void,
  onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

const Pagination = ({ classes, total, tableFilter, onChangePage, onChangeRowsPerPage }: Props) => (
  <div>
    <TablePagination
      count={total}
      component="div"
      page={tableFilter.page}
      onChangePage={onChangePage}
      rowsPerPage={tableFilter.rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onChangeRowsPerPage={onChangeRowsPerPage}
      classes={{
        select: classes.select,
        caption: classes.caption,
        actions: classes.actions,
        selectRoot: classes.selectRoot,
      }}
      backIconButtonProps={{
        style: { padding: 0 },
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        style: { padding: 0 },
        'aria-label': 'Next Page',
      }}
    />
  </div>
)

export default withStyles(styles)(Pagination)
