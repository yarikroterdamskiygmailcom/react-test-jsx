import { NotFound, PaymentRequired, Unauthorized } from '../constants'

interface Error {
  status: number,
  data: {
    status: number,
    message: string,
  }
}

const transformValidationApi = (errors: Error) => {
  if (errors.status === NotFound) {
    return ({ email: 'Такой логин не найден. Возможно вы хотите зарегистироваться?' })
  }

  if (errors.data.status === 0) {
    return ({ email: errors.data.message })
  }

  if (errors.status === Unauthorized) {
    return ({ password: 'Неверный пароль' })
  }

  if (errors.status === PaymentRequired) {
    return ({ email: errors.data.message })
  }

  return {}
}

export default transformValidationApi
