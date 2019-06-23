import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import ImageRoot from 'src/components/common/ImageRoot'
import Footer from 'src/components/common/Footer'
import LaptopVideoComponent from './LaptopVideoComponent'
import ChangePasswordScene from './@changePassword/ChangePasswordScene'
import RegisterScene from './@register/RegisterScene'
import ForgotScene from './@forgot/ForgotScene'
import LoginScene from './@login/LoginScene'

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: 100,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    ...globalStyles.flexBetween,
  },
  layout: {
    width: '100%',
    margin: 'auto 0',
  },
  container: {
    width: '100%',
    height: '100%',
    ...globalStyles.flexEvenly,
    ...globalStyles.alignCenter,
    background: '#edf5fa',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  auth: {
    height: '100%',
    paddingTop: 50,
    paddingBottom: 50,
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 20,
      paddingBottom: 0,
    },
  },
  laptop: {
    ...globalStyles.alignCenter,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
})

const AuthLayout = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div className={classes.layout}>
      <ImageRoot />

      <div className={classes.container}>
        <div className={classes.auth}>
          <Switch>
            <Route exact path="/auth/register" component={RegisterScene} />
            <Route exact path="/auth/login" component={LoginScene} />
            <Route path="/auth/forgot" component={ForgotScene} />
            <Route path="/auth/change-password" component={ChangePasswordScene} />
            {/*<Route path="/auth/restore_password/:token" component={ForgotScene} />// TODO: сделать страницу */}
            <Redirect to="/auth/login" />
          </Switch>
        </div>

        <div className={classes.laptop}>
          <LaptopVideoComponent />
        </div>
      </div>

    </div>
    <Footer />
  </div>
)

export default withStyles(styles)(AuthLayout)
