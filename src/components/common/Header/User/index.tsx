import React, { Component, MouseEvent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { createStyles, Hidden, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { Company, GetExcel } from 'src/redux/app/company/types'
import { User } from 'src/redux/app/auth/types'
import MenuIcon from 'src/assets/images/menu.png'
import { userIconSize } from 'src/constants'
import UserIcon from 'mdi-react/UserIcon'
import UserMenu from './UserMenu'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    color: 'white',
    ...globalStyles.flexCenter,
  },
  flexBetween: {
    ...globalStyles.flexBetween,
  },
  icon: {
    marginRight: 15,
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 13,
  },
  menu: {
    ...globalStyles.alignCenter,
    marginLeft: 30,
  },
})

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
  user: User | null,
  company: Company | null,
  actions: {
    logout: () => void,
    excel: (data: GetExcel) => void,
  },
}

interface State {
  anchorEl: HTMLElement | null,
}

type Request = {
  value: {
    file_name: string,
  },
}

class UserHeader extends Component<Props, State> {
  public state = {
    anchorEl: null,
  }

  public handleMenu = (event: MouseEvent<HTMLDivElement>) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = (event: MouseEvent<HTMLDivElement>) => {
    this.setState({ anchorEl: null })
    event.stopPropagation()
  }

  public logout = () => {
    const { actions, history } = this.props
    actions.logout()
    history.push('/auth/login')
  }

  public handleChooseCompany = () => {
    const { history } = this.props
    history.push('/company/choose')
  }

  public handleChoosePassword = () => {
    const { history } = this.props
    history.push('/auth/change-password')
  }

  public handleOpenAPI = () => {
    const { company, history } = this.props
    if (company) {
      history.push(`/company/${company._id}/api`)
    }
  }

  public handleOpenUnloading = async () => {
    const { user, company, actions } = this.props

    if (user && company) {
      const excel: unknown | Request = await actions.excel({ user_id: user.id, company_id: company._id })
      window.location = `${process.env.REACT_APP_BACKEND_URL}/excel/${(excel as Request).value.file_name}` as unknown as Location
    }
  }

  public render(): React.ReactNode {
    const { user, company, classes } = this.props
    const { anchorEl } = this.state

    return user && (
      <div className={classes.root}>
        <Hidden mdUp implementation="css">
          <div onClick={this.handleMenu}>
            <UserIcon className={classes.icon} size={userIconSize} color="white" />
          </div>
        </Hidden>

        <Hidden smDown implementation="css">
          <div className={classes.flexBetween}>
            <UserIcon className={classes.icon} size={userIconSize} color="white" />

            <div>
              <Typography variant="subtitle1" color="inherit" className={classes.name}> {user.name} </Typography>
              <Typography variant="subtitle1" color="inherit" className={classes.email}> {user.email} </Typography>
            </div>

            <img alt="menu" src={MenuIcon} className={classes.menu} onClick={this.handleMenu} />
          </div>
        </Hidden>

        <UserMenu
          user={user}
          company={company}
          anchorEl={anchorEl}
          onLogout={this.logout}
          onOpenAPI={this.handleOpenAPI}
          onCloseMenu={this.handleClose}
          onOpenUnloading={this.handleOpenUnloading}
          onChooseCompany={this.handleChooseCompany}
          onChoosePassword={this.handleChoosePassword}
        />
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(connector(UserHeader)))
