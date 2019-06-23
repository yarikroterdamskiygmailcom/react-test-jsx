import React from 'react'
import { Button, Collapse, Typography } from '@material-ui/core'
import { Field, Form } from 'formik'
import Input from 'src/components/controls/Input'
import CheckBox from 'src/components/controls/CheckBox'
import AuthLink from 'src/components/@auth/common/AuthLink'
import { timeoutRegister } from 'src/constants'
import EmailPhone from './EmailPhone'
import formik from './formik'

interface Props {
  email?: string,
  checked: boolean,
  isSubmitting: boolean,
}

const MainForm = ({ email, checked, isSubmitting }: Props) => (
  <Collapse in={checked} timeout={timeoutRegister}>
    <Form>
      <EmailPhone email={email} />

      <Field
        fullWidth
        name="name"
        component={Input}
        placeholder="Ваше имя"
      />
      <Field
        fullWidth
        type="password"
        name="password"
        component={Input}
        placeholder="Придумайте пароль"
      />
      <Field
        fullWidth
        type="password"
        name="confirmPassword"
        component={Input}
        placeholder="Повторите пароль"
      />

      <Field
        name="confirm"
        component={CheckBox}
        label={<Typography>
          Согласен с
          <a href="https://finmap.online/oferta" style={{ color: '#45a5b9' }}> пользовательским соглашением.</a>
        </Typography>}
      />

      <Button fullWidth type="submit" disabled={isSubmitting}>
        Продолжить
      </Button>

      <AuthLink linkTo="/auth/login" linkText="Уже есть аккаунт? Войдите в систему." />
    </Form>
  </Collapse>
)

export default formik(MainForm)
