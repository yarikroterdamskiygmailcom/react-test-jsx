import React from 'react'
import { Button, Collapse } from '@material-ui/core'
import { Field, Form } from 'formik'
import Input from 'src/components/controls/Input'
import { timeoutRegister } from 'src/constants'
import formik from './formik'

interface Props {
  checked: boolean,
  isSubmitting: boolean,
}

const Step1Form = ({ checked, isSubmitting }: Props) => (
  <Collapse in={checked} timeout={timeoutRegister}>
    <Form style={{ marginBottom: 30 }}>
      <Field
        fullWidth
        component={Input}
        name="emailOrPhone"
        placeholder="Email или телефон"
      />

      <Button fullWidth type="submit" disabled={isSubmitting}>
        Продолжить
      </Button>
    </Form>
  </Collapse>
)

export default formik(Step1Form)
