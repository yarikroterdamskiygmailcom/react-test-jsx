import React from 'react'
import { createStyles, TableCell, withStyles, WithStyles } from '@material-ui/core'

const styles = createStyles({
  root: {
    minWidth: 97,
  }
})

interface Props extends WithStyles<typeof styles> {
  date: string,
}

const HeaderCell = ({ classes, date }: Props) => (
  <TableCell align="center" className={classes.root}>
    {date}
  </TableCell>
)

export default withStyles(styles)(HeaderCell)
