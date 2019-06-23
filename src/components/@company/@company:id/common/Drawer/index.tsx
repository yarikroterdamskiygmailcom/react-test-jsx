import React, { Component } from 'react'
import CompanyData from '../CompanyData'
import { SwipeableDrawer } from '@material-ui/core'
import connector from './connector'

interface Props {
  isDrawerOpened: boolean,
  actions: {
    openDrawer: () => void,
    closeDrawer: () => void,
  }
}

class Drawer extends Component<Props> {
  public handleCloseDrawer = () => {
    const { actions } = this.props
    actions.closeDrawer()
  }

  public handleOpenDrawer = () => {
    const { actions } = this.props
    actions.openDrawer()
  }

  public render() {
    const { isDrawerOpened } = this.props

    return (
      <SwipeableDrawer
        open={isDrawerOpened}
        onClose={this.handleCloseDrawer}
        onOpen={this.handleOpenDrawer}
      >
        <CompanyData />
      </SwipeableDrawer>
    )
  }
}

export default connector(Drawer)
