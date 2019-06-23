import React from 'react'
import Logo from 'src/assets/images/logo.gif'
import { createStyles, WithStyles, withStyles } from '@material-ui/core'

const styles = createStyles({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Loading = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <img alt="Logo" src={Logo} />
  </div>
)

export default withStyles(styles)(Loading)
