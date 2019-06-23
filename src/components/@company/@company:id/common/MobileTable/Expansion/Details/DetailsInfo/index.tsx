import React from 'react'
import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'

const styles = createStyles({
  root: {
    marginTop: 10,
    color: '#171717',
    ...globalStyles.flexBetween,
  },
  title: {
    fontWeight: 'bold',
  },
})

interface Props extends WithStyles<typeof styles> {
  title: string,
  infoValue: string | number,
}

const DetailsInfo = ({ classes, title, infoValue }: Props) => (
  <div className={classes.root}>
    <Typography className={classes.title} color="inherit">{title}:</Typography>
    <div><Typography color="inherit" align="right">{infoValue}</Typography></div>
  </div>
)

export default withStyles(styles)(DetailsInfo)
