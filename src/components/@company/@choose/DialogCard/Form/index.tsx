import React from 'react'
import { isEmpty } from 'lodash'
import { Field, Form } from 'formik'
import { Button } from '@material-ui/core'
import Input from 'src/components/controls/Input'
import SelectAutosuggest from 'src/components/controls/SelectAutosuggest'
import MySwitch from 'src/components/controls/MySwitch'
import ShowError from 'src/components/common/ShowError'
import { Currency } from '../../types'
import formik from './formik'

interface Props {
  error: string | null,
  currencies: [Currency] | null,
  isSubmitting: boolean,
}

const CreateCompanyForm = ({ error, currencies, isSubmitting }: Props) => (
  <Form>
    <Field
      name="isDemo"
      component={MySwitch}
    />

    <Field
      fullWidth
      name="name"
      component={Input}
      placeholder="Название компании"
    />
    {!isEmpty(currencies) && (
      <Field
        disabled
        fullWidth
        name="currency"
        data={currencies}
        component={SelectAutosuggest}
        placeholder="Выберите валюту"
      />)}

    {error && <ShowError isFormTouched={!!error} error={error} />}

    <Button fullWidth type="submit" disabled={isSubmitting}>
      Сохранить
    </Button>
  </Form>
)

export default formik(CreateCompanyForm)
