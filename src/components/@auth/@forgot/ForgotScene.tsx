import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import Signature from '../common/Signature'
import ForgotForm from './ForgotForm'
import connector from './connector'
import { ForgotFormValues } from './types'

const styles = (theme: Theme) => createStyles({
  root: {
    width: 420,
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
})

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
  actions: {
    forgot: ({ email }: ForgotFormValues) => void
  }
}

class ForgotScene extends Component<Props> {
  public forgot = async ({ email }: ForgotFormValues): Promise<void> => {
    const { actions, history } = this.props

    await actions.forgot({ email })

    history.push('/auth/login')
  }

  public render(): React.ReactNode {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Signature
          title="ВОССТАНОВЛЕНИЕ ПАРОЛЯ"
          linkTo="/auth/login"
          linkText="Вернуться на страницу входа в систему"
          description="Введите свой e-mail и Вам на почту прийдет ссылка на восстановление пароля"
        />

        <ForgotForm onSubmit={this.forgot} />
      </div>
    )
  }
}

export default withStyles(styles)(connector(ForgotScene))
