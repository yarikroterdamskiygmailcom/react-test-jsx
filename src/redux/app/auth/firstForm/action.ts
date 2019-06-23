import Auth from 'src/api/Auth'
import { Step1Data, Step1FormValues } from 'src/components/@auth/@register/types'

export const AUTH_STEP_1_FORM = 'AUTH_STEP_1_FORM'
export const AUTH_STEP_1_FORM_PENDING = 'AUTH_STEP_1_FORM_PENDING'
export const AUTH_STEP_1_FORM_FULFILLED = 'AUTH_STEP_1_FORM_FULFILLED'
export const AUTH_STEP_1_FORM_REJECTED = 'AUTH_STEP_1_FORM_REJECTED'

const addLeed = (firstFormValue: Step1FormValues, data: Step1Data) => ({
  type: AUTH_STEP_1_FORM,
  payload: Auth.createLeed(data),
  meta: firstFormValue,
})

export default { addLeed }
