import Http from 'src/services/Http'
import { ForgotFormValues } from 'src/components/@auth/@forgot/types'
import { MainFormValues, Step1Data } from 'src/components/@auth/@register/types'
import { LoginFormValues } from 'src/components/@auth/@login/types'
import { ChangePasswordRequest } from 'src/components/@auth/@changePassword/types'

class Auth {
  public static async authorize(path: string, body: object): Promise<void> {
    Http.setAuthHeader()

    try {
      const response = await Http.instance.post(path, body)
      return response.data
    } catch (err) {
      Http.handleError(err)
    }
  }

  public createLeed(form: Step1Data) {
    return Auth.authorize('/leeds/create_leed', form)
  }

  public register(form: MainFormValues) {
    return Auth.authorize('/registration', form)
  }

  public login({ email, password }: LoginFormValues) {
    return Auth.authorize('/login', { email, password })
  }

  public forgot({ email }: ForgotFormValues) {
    return Auth.authorize('/password/recovery/forgot_password', { email })
  }

  public changePassword(form: ChangePasswordRequest) {
    return Auth.authorize('/update_user_data', form)
  }
}

export default new Auth()
