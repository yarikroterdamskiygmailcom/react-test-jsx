import React from 'react'
import { Form } from 'formik'
import { globalStyles } from 'src/styles/global-styles'
import DialogContainer from './DialogContainer'
import DialogFooter from './DialogFooter'
import formik from './formik'
import { FormProps } from './types'
import connector from './connector'

const FormIncomeConsumption = ({ onDelete, journalData, analyticsData }: FormProps) => (
  <Form style={globalStyles.fullWidth}>
    <DialogContainer />
    <DialogFooter onDelete={onDelete} journalData={journalData || analyticsData} />
  </Form>
)

export default connector(formik(FormIncomeConsumption))
