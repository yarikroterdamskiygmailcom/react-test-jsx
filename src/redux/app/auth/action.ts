import Auth from 'src/api/Auth'
import { LoginFormValues } from 'src/components/@auth/@login/types'
import { MainFormValues } from 'src/components/@auth/@register/types'
import { ForgotFormValues } from 'src/components/@auth/@forgot/types'
import { ChangePasswordRequest } from 'src/components/@auth/@changePassword/types'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING'
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED'
export const LOGIN_USER_REJECTED = 'LOGIN_USER_REJECTED'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING'
export const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED'
export const REGISTER_USER_REJECTED = 'REGISTER_USER_REJECTED'

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_PENDING = 'FORGOT_PASSWORD_PENDING'
export const FORGOT_PASSWORD_FULFILLED = 'FORGOT_PASSWORD_FULFILLED'
export const FORGOT_PASSWORD_REJECTED = 'FORGOT_PASSWORD_REJECTED'

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const CHANGE_PASSWORD_PENDING = 'CHANGE_PASSWORD_PENDING'
export const CHANGE_PASSWORD_FULFILLED = 'CHANGE_PASSWORD_FULFILLED'
export const CHANGE_PASSWORD_REJECTED = 'CHANGE_PASSWORD_REJECTED'

export const LOGOUT_USER = 'LOGOUT_USER'

const login = (form: LoginFormValues) => ({
  type: LOGIN_USER,
  payload: Auth.login(form),
})

const register = (form: MainFormValues) => ({
  type: REGISTER_USER,
  payload: Auth.register(form),
})

const forgot = (form: ForgotFormValues) => ({
  type: FORGOT_PASSWORD,
  payload: Auth.forgot(form),
})

const changePassword = (form: ChangePasswordRequest) => ({
  type: CHANGE_PASSWORD,
  payload: Auth.changePassword(form),
})

const logout = () => ({
  type: LOGOUT_USER,
})

export default { login, register, forgot, changePassword, logout }
