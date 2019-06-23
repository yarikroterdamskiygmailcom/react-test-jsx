import React from 'react'
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import FirstColumn from './FirstColumn'
import SecondColumn from './SecondColumn'
import ThirdColumn from './ThirdColumn'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    ...globalStyles.flexAround,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  container: {
    width: '100%',
    ...globalStyles.flexAround,
    [theme.breakpoints.down('sm')]: {
      ...globalStyles.flexBetween,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },

  comment: {
    width: '100%',
    maxWidth: 330,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
})

const DialogContainer = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <FirstColumn />
      <SecondColumn />
    </div>
    <div className={classes.comment}>
      <ThirdColumn />
    </div>
  </div>
)

export default withStyles(styles)(DialogContainer)
