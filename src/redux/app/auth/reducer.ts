import { AnyAction } from 'redux'
import { AuthState, User } from './types'
import Storages from 'src/services/Storages'
import {
  CHANGE_PASSWORD_PENDING,
  FORGOT_PASSWORD_FULFILLED,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_REJECTED,
  CHANGE_PASSWORD_REJECTED,
  CHANGE_PASSWORD_FULFILLED,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
  LOGOUT_USER,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_PENDING,
  REGISTER_USER_REJECTED,
} from './action'

const initialState: AuthState = {
  errors: {},
  isError: false,
  loading: false,
  user: Storages.get('user') as User || null,
}

const authReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case LOGIN_USER_PENDING:
    case REGISTER_USER_PENDING:
    case FORGOT_PASSWORD_PENDING:
    case CHANGE_PASSWORD_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case LOGIN_USER_REJECTED:
    case REGISTER_USER_REJECTED:
    case FORGOT_PASSWORD_REJECTED:
    case CHANGE_PASSWORD_REJECTED:
      return {
        ...state,
        loading: false,
        isError: true,
        errors: payload,
      }

    // case LOGIN_USER_FULFILLED:
    // case REGISTER_USER_FULFILLED: {
    //   return {
    //     ...state,
    //     user: {
    //       id: payload._id,
    //       ...payload,
    //     },
    //     errors: {},
    //     isError: false,
    //     loading: false,
    //   }
    // }
    case LOGIN_USER_FULFILLED:
    case REGISTER_USER_FULFILLED: {
      return {
        ...state,
        user: {
          ...payload.data,
          id: payload.data._id,
          token: payload.token,
        },
        errors: {},
        isError: false,
        loading: false,
      }
    }

    case FORGOT_PASSWORD_FULFILLED:
    case CHANGE_PASSWORD_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
      }

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}

export default authReducer
