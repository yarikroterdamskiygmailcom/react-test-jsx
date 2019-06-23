import React from 'react'
import { createStyles, TableCell, TableHead, TableRow, WithStyles, withStyles } from '@material-ui/core'

const styles = createStyles({
  root: {
    textAlign: 'left',
    paddingLeft: 50,
    font: '700 16px Gotham Pro',
    color: 'black',
    fontWeight: 700,
    width: '33%',
    '@media (max-width: 1399.98px)': {
      fontSize: 14,
      paddingLeft: 30,
    },
    '@media (max-width: 799.98px)': {
      fontSize: 12,
      paddingLeft: 10,
    },
  }
})

interface HeadProps extends WithStyles<typeof styles> {
  headerLabels: string[],
}

const Head = ({ headerLabels, classes }: HeadProps) => (
  <TableHead>
    <TableRow>
      {headerLabels.map((label, index) => (
        <TableCell className={classes.root} key={index}>
          {label}
        </TableCell>))}
    </TableRow>
  </TableHead>
)

export default withStyles(styles)(Head)
