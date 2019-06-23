import React from 'react'
import { Button, createStyles, withStyles, WithStyles } from '@material-ui/core'

const styles = createStyles({
  navigation: {
    marginTop: 5,
    width: '100%',
    minWidth: 120,
    color: 'inherit',
    fontWeight: 500,
  },
})

interface Props extends WithStyles<typeof styles> {
  path: string,
  title: string,
}

const ButtonNavigation = ({ classes, path, title }: Props) => (
  <Button
    value={path}
    variant="outlined"
    className={classes.navigation}
  >
    {title}
  </Button>
)

export default withStyles(styles)(ButtonNavigation)
