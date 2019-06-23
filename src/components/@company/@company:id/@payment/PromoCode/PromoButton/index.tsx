import React from 'react'
import DoneIcon from 'mdi-react/DoneIcon'
import { Button, createStyles, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'

const styles = createStyles({
  root: {
    ...globalStyles.button,
    marginLeft: 10,
    width: 100,
  }
})

const PromoButton = ({ classes }: WithStyles<typeof styles>) => (
  <Button type="submit" className={classes.root}>
    <DoneIcon />
  </Button>
)

export default withStyles(styles)(PromoButton)
