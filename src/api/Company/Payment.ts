import Http from 'src/services/Http'
import { Subscribe, UnsubscribeParams } from 'src/redux/app/company/payment/types'

class Payment {
  public static async request(path: string, body?: object): Promise<void> {
    Http.setAuthHeader()

    try {
      const response = await Http.instance.post(`/payments${path}`, body || {})
      return response.data.data
    } catch (error) {
      Http.handleError(error)
    }
  }

  public unsubscribe(data: UnsubscribeParams) {
    return Payment.request('/unsubscribe', data)
  }

  public subscribe(data: Subscribe) {
    return Payment.request('/subscribe', data)
  }

  public changeTariff(data: Subscribe) {
    return Payment.request('/change_tariff', data)
  }
}

export default new Payment()
