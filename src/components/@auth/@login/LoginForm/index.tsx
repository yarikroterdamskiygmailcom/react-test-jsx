import React from 'react'
import { Field, Form } from 'formik'
import { Button } from '@material-ui/core'
import AuthLink from '../../common/AuthLink'
import Input from 'src/components/controls/Input'
import formik from './formik'

interface Props {
  isSubmitting: boolean,
}

const LoginForm = ({ isSubmitting }: Props) => (
  <Form>
    <Field
      fullWidth
      name="email"
      component={Input}
      placeholder="Ваш логин"
    />
    <Field
      fullWidth
      type="password"
      name="password"
      component={Input}
      placeholder="Пароль"
    />

    <AuthLink linkTo="/auth/forgot" linkText="Забыли пароль?" />

    <Button fullWidth type="submit" disabled={isSubmitting}>
      Войти
    </Button>
  </Form>
)

export default formik(LoginForm)
