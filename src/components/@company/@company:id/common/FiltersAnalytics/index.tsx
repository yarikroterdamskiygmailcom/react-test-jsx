import React from 'react'
import { Form } from 'formik'
import Filters from './Filters'
import connector from './connector'
import formik from './formik'

const FiltersAnalytics = () => (
  <Form>
    <Filters />
  </Form>
)

export default connector(formik(FiltersAnalytics))
