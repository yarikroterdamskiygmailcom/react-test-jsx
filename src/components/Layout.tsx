import React from 'react'
import loadable from '@loadable/component'
import { Redirect, Route, Switch } from 'react-router-dom'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'

import IndexScene from './@index/IndexScene'
import Header from 'src/components/common/Header'
import { CompanyProps } from './@company/CompanyLayout'

const styles = createStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    marginTop: 100,
    height: '100%',
    position: 'relative',
  },
})

const AuthLayout = loadable(() => import('./@auth/AuthLayout'))
const CompanyLayout = loadable(() => import('./@company/CompanyLayout'))

const Auth = (props: object) => <AuthLayout {...props} />
const Company = (props: CompanyProps) => <CompanyLayout {...props} />

const Layout = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Header />

    <Switch>
      <Route exact path="/" component={IndexScene} />
      <Route path="/auth" component={Auth} />
      <Route path="/company" component={Company} />
      <Redirect to="/" />
    </Switch>
  </div>
)

export default withStyles(styles)(Layout)
