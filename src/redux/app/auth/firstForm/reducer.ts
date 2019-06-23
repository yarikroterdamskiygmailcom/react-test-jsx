import { AnyAction } from 'redux'
import { FirstFormState } from './types'
import { AUTH_STEP_1_FORM_FULFILLED, AUTH_STEP_1_FORM_PENDING, AUTH_STEP_1_FORM_REJECTED, } from './action'

const initialState: FirstFormState = {
  errors: {},
  isError: false,
  loading: false,
  email: '',
  phone: '',
  leedId: '',
}

const authFirstFormReducer = (state = initialState, { type, payload, meta }: AnyAction) => {
  switch (type) {
    case AUTH_STEP_1_FORM_PENDING:
      return {
        ...state,
        ...meta,
        error: false,
        loading: true,
      }
    case AUTH_STEP_1_FORM_REJECTED:
      return {
        ...state,
        loading: false,
        isError: true,
        errors: payload,
      }

    case AUTH_STEP_1_FORM_FULFILLED:
      return {
        ...state,
        ...meta,
        isError: false,
        loading: false,
        leedId: payload._id,
      }

    default:
      return state
  }
}

export default authFirstFormReducer
