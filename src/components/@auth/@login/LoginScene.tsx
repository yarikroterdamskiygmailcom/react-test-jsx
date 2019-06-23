import React, { Component } from 'react'
import Signature from '../common/Signature'
import LoginForm from './LoginForm'
import connector from './connector'
import { LoginFormValues } from './types'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
  root: {
    width: 420,
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  actions: {
    login: ({ email, password }: LoginFormValues) => void
  },
  history: {
    push: (url: string) => void,
  },
}

class LoginScene extends Component<Props> {
  public login = async ({ email, password }: LoginFormValues): Promise<void> => {
    const { actions, history } = this.props

    await actions.login({ email, password })

    history.push('/company/choose')
  }

  public render(): React.ReactNode {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Signature
          title="ВХОД В СИСТЕМУ"
          linkTo="/auth/register"
          linkText="Нет аккаунта? Зарегистрируйтесь"
          description="Финансовая аналитика, контроль движения денег и автоматические отчеты"
        />

        <LoginForm onSubmit={this.login} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(LoginScene))
