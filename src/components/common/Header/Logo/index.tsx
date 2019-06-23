import React, { PureComponent } from 'react'
import { Avatar, createStyles, IconButton, Theme, WithStyles, withStyles } from '@material-ui/core'
import FinMapLogo from 'src/assets/images/FinMapLogo.png'
import { globalStyles } from 'src/styles/global-styles'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  logo: {
    width: 60,
    height: 60,
    borderRadius: 0,
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('xs')]: {
      width: 40,
      height: 40,
      paddingLeft: 0,
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  actions: {
    openDrawer: () => void,
  },
}

class Logo extends PureComponent<Props> {
  public handleOpenDrawer = () => {
    const { actions } = this.props
    const md = 1024

    // для открытия drawer
    if (window.innerWidth < md) actions.openDrawer()
  }

  public render() {
    const { classes } = this.props

    return (
      <IconButton onClick={this.handleOpenDrawer}>
        <Avatar className={classes.logo} src={FinMapLogo} />
      </IconButton>
    )
  }
}

export default withStyles(styles)(connector(Logo))
