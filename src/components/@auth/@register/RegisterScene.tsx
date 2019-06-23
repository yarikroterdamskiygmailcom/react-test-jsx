import React, { Component } from 'react'
import classNames from 'classnames'
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import { MainFormValues, Step1Data, Step1FormValues } from './types'
import { globalStyles } from 'src/styles/global-styles'
import queryString from 'query-string'
import { isEmpty } from 'lodash'

import Signature from '../common/Signature'
import Step1Form from './RegisterForm/Step1Form'
import MainForm from './RegisterForm/MainForm'
import connector from './connector'

const styles = (theme: Theme) => createStyles({
  root: {
    width: 420,
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  animateOutIn: {
    ...globalStyles.animateOutIn,
  },
  animateInOut: {
    ...globalStyles.animateInOut,
  },
})

interface Props extends WithStyles<typeof styles> {
  isError: boolean,
  email?: string,
  phone?: string,
  leedId?: string,
  location: {
    search: string,
  },
  history: {
    push: (url: string) => void,
  },
  actions: {
    register: (form: MainFormValues) => void
    firstForm: (form: Step1FormValues, data: Step1Data) => void
  }
}

class RegisterScene extends Component<Props> {

  public register = async (form: MainFormValues) => {
    const { actions, history } = this.props

    await actions.register(form)

    history.push('/company/choose')
  }

  public firstForm = async (form: Step1FormValues, data: Step1Data) => {
    const { actions, location } = this.props

    const queryParams = queryString.parse(location.search)

    await actions.firstForm(form, { ...data, utm_params: queryParams })
  }

  public render(): React.ReactNode {
    const { classes, isError, email, phone, leedId } = this.props
    const isStepOne = isEmpty(email) && isEmpty(phone)

    return (
      <div className={classes.root}>
        <Signature
          title="РЕГИСТРАЦИЯ"
          description="Финансовая аналитика, контроль движения денег и автоматические отчеты"
        />

        <div className={classNames({ [classes.animateOutIn]: (!isError && !isStepOne) })}>
          <Step1Form checked={isError || isStepOne} onSubmit={this.firstForm} />
        </div>
        <div className={classNames([(!isError && isStepOne) ? classes.animateOutIn : classes.animateInOut])}>
          <MainForm
            email={email}
            phone={phone}
            leedId={leedId}
            onSubmit={this.register}
            checked={!isError && !isStepOne}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(connector(RegisterScene))
