import React from 'react'
import { Field, Form } from 'formik'
import { Button } from '@material-ui/core'
import Input from 'src/components/controls/Input'
import formik from './formik'

interface Props {
  isSubmitting: boolean,
}

const ForgotForm = ({ isSubmitting }: Props) => (
  <Form>
    <Field
      fullWidth
      name="email"
      component={Input}
      placeholder="Email"
    />

    <Button fullWidth type="submit" disabled={isSubmitting}>
      Восстановление пароля
    </Button>
  </Form>
)

export default formik(ForgotForm)
