import React from 'react'
import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core'

const styles = createStyles({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const CompanyNotFound = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Typography variant="subtitle1">Company not found</Typography>
  </div>
)

export default withStyles(styles)(CompanyNotFound)
