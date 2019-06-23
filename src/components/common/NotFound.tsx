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

const NotFound = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Typography variant="subtitle1">Not found</Typography>
  </div>
)

export default withStyles(styles)(NotFound)
