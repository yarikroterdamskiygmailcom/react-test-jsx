import React from 'react'
import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'

const styles = createStyles({
  root: {
    padding: 15,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
  },
})

const NotFoundDataTable = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Typography variant="subtitle1" className={classes.title}>
      У вас пока нет записей в финансовом журнале
    </Typography>
  </div>
)

export default withStyles(styles)(NotFoundDataTable)
