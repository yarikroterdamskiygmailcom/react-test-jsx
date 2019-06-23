import React from 'react'
import { Field } from 'formik'
import ExchangeRateInput from 'src/components/controls/ExchangeRateInput'

const ExchangeRateField = () => (
  <Field
    type="number"
    name="exchangeRateInput"
    component={ExchangeRateInput}
  />
)

export default ExchangeRateField
