import React from 'react'
import { Form } from 'formik'
import { globalStyles } from 'src/styles/global-styles'
import DialogContainer from './DialogContainer'
import { FormProps } from './types'
import connector from './connector'
import formik from './formik'

const FormTransfer = ({ onDelete, journalData, analyticsData }: FormProps) => (
  <Form style={globalStyles.fullWidth}>
    <DialogContainer onDelete={onDelete} journalData={journalData || analyticsData} />
  </Form>
)

export default connector(formik(FormTransfer))
