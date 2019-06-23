import React from 'react'
import { createStyles, TableCell, TableHead, TableRow, WithStyles, withStyles } from '@material-ui/core'

const styles = createStyles({
  root: {
    textAlign: 'left',
    font: '700 15px Gotham Pro',
    color: 'black',
    fontWeight: 700,
    width: '20%',
  }
})

interface Props extends WithStyles<typeof styles> {
  headerLabels: string[],
}

const Head = ({ headerLabels, classes }: Props) => (
  <TableHead>
    <TableRow>
      {headerLabels.map((label, index) => (
          <TableCell className={classes.root} key={index}>
            {label}
          </TableCell>
        )
      )}
    </TableRow>
  </TableHead>
)

export default withStyles(styles)(Head)
