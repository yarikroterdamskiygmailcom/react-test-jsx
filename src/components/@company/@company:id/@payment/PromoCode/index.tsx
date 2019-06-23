import React from 'react'
import { Field, Form } from 'formik'
import Input from 'src/components/controls/Input'
import formik from './formik'
import PromoButton from './PromoButton'

const PromoCode = () => (
  <Form style={{ display: 'flex' }}>
    <Field
      name="promoCode"
      placeholder="Введите промокод"
      component={Input}
    />

    <PromoButton />
  </Form>
)

export default formik(PromoCode)
