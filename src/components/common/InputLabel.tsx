import React from 'react'
import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'

const styles = createStyles({
  inputLabel: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
})

interface Props extends WithStyles<typeof styles> {
  inputLabel: string,
}

const InputLabel = ({ classes, inputLabel }: Props) => (
  <Typography variant="subtitle1" className={classes.inputLabel}>{inputLabel}</Typography>
)

export default withStyles(styles)(InputLabel)
