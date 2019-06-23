import React from 'react'
import { createStyles, TableCell, TableSortLabel, withStyles, WithStyles } from '@material-ui/core'
import { Order } from 'src/constants'

const styles = createStyles({
  label: {
    paddingLeft: 15,
  },
})

interface Props extends WithStyles<typeof styles> {
  name: string,
  title: string,
  orderBy: string,
  order: string,
  onTableSort: () => void,
}

const HeadRows = ({ classes, name, title, order, orderBy, onTableSort }: Props) => (
  <TableCell align="center" sortDirection={order as Order.asc as Order.desc}>
    <TableSortLabel
      onClick={onTableSort}
      active={name === orderBy}
      className={classes.label}
      direction={order as Order.asc as Order.desc}
    >
      {title}
    </TableSortLabel>
  </TableCell>
)

export default withStyles(styles)(HeadRows)
