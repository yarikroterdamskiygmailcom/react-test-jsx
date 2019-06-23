import Http from 'src/services/Http'
import { OutputJournalData } from 'src/redux/app/journal/types'
import { GetFiltersData } from 'src/redux/app/ui/secondaryData/types'
import { DeleteTransaction, OutputJournalAnalyticsData, SetOperation } from 'src/redux/app/types'

class Journal {
  public static async request(path: string, body?: object | null): Promise<void> {
    Http.setAuthHeader()

    try {
      const response = await Http.instance.post(`/journal${path}`, body || {})
      return response.data
    } catch (error) {
      Http.handleError(error)
    }
  }

  public getSchedulePeriods() {
    return Journal.request('/get_schedule_periods')
  }

  public getFiltersData(data: GetFiltersData) {
    return Journal.request('/get_filters_data', data)
  }

  public setOperation(data: SetOperation) {
    return Journal.request('/set_operation', data)
  }

  public getJournalData(data: OutputJournalData | null) {
    return Journal.request('/get_journal_data', data)
  }

  public getJournalDataPaginated(data: OutputJournalAnalyticsData | null) {
    return Journal.request('/get_journal_data_paginated', data)
  }

  public updateTransactionData(data: SetOperation) {
    return Journal.request('/update_transaction_data', data)
  }

  public deleteTransaction(data: DeleteTransaction) {
    return Journal.request('/delete_transaction', data)
  }
}

export default new Journal()
