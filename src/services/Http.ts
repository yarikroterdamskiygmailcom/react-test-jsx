import axios, { AxiosError, AxiosInstance } from 'axios'
import store from 'src/redux/store'
import auth from 'src/redux/app/auth/action'
import { PaymentRequired } from 'src/constants'

class Http {
  public instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      timeout: 10000,
    })
  }

  public handleError(err: AxiosError) {
    if (err) {
      if (err.response) {
        const status = err.response.status

        if (status === PaymentRequired) {
          store.dispatch(auth.logout())
        }
        throw err.response
      } else {
        throw err
      }
    }
  }

  // public setAuthHeader() {
  //   const user = store.getState().auth.user
  //   if (user && user.token) {
  //     const { headers } = this.instance.defaults
  //     headers.common.Authorization = `Bearer ${user.token.replace(/^"(.*)"$/, '$1')}`
  //   }
  // }
  public setAuthHeader() {
    const user = store.getState().auth.user
    if (user && user.token) {
      const { headers } = this.instance.defaults
      headers.common.Authorization = `Bearer ${user.token}`
    }
  }
}

export default new Http()
