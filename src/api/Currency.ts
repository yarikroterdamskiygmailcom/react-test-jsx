import Http from 'src/services/Http'

class Currency {
  public static async request(path: string, body?: object): Promise<void> {
    Http.setAuthHeader()

    try {
      const response = await Http.instance.post(`/currencies${path}`, body || {})
      return response.data.data
    } catch (error) {
      Http.handleError(error)
    }
  }

  public getCurrencies() {
    return Currency.request('/get_currencies')
  }

  public getExchangeRates() {
    return Currency.request('/get_exchange_rates')
  }
}

export default new Currency()
