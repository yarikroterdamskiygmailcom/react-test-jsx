import Http from 'src/services/Http'
import { DeleteTransaction, OutputJournalAnalyticsData } from 'src/redux/app/types'

class Analytics {
  public static async request(path: string, body?: object | null): Promise<void> {
    Http.setAuthHeader()

    try {
      const response = await Http.instance.post(`/journal${path}`, body || null)
      return response.data

    } catch (error) {
      Http.handleError(error)
    }
  }

  public getAnalyticsDataPaginated(data: OutputJournalAnalyticsData | null) {
    return Analytics.request('/get_analytics_data_paginated', data)
  }

  public getAnalyticsData(data: OutputJournalAnalyticsData | null) {
    return Analytics.request('/get_analytics_data', data)
  }

  public deleteTransaction(data: DeleteTransaction) {
    return Analytics.request('/delete_transaction', data)
  }
}

export default new Analytics()
