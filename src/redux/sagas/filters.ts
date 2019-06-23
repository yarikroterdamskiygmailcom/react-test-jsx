import { all, put, takeEvery } from 'redux-saga/effects'
import store from '../store'
import actions from '../app/actions'

function getFilters() {
  const { user } = store.getState().auth
  const { tableFilter } = store.getState().ui
  const { currentCompany } = store.getState().company

  if (currentCompany && user) {
    return {
      companyId: currentCompany._id,
      userId: user.id,
      filters: tableFilter.filters,
      page: tableFilter.page,
      order: tableFilter.order,
      orderBy: tableFilter.orderBy,
      rowsPerPage: tableFilter.rowsPerPage,
    }
  }

  return null
}

function* outputJournalFilters() {
  yield put(actions.journal.getJournalDataPaginated(getFilters()))
}

function* outputAnalyticsFilters() {
  yield put(actions.analytics.getAnalyticsData(getFilters()))
  yield put(actions.analytics.getAnalyticsDataPaginated(getFilters()))
}

function* outputFilters() {
  const { analyticsDataPaginated } = store.getState().analytics
  const { journalDataPaginated } = store.getState().journal

  if (analyticsDataPaginated) yield outputAnalyticsFilters()
  if (journalDataPaginated) yield outputJournalFilters()
}

export default function* filters() {
  yield all([
    takeEvery('OUTPUT_JOURNAL_FILTERS', outputJournalFilters),
    takeEvery('OUTPUT_ANALYTICS_FILTERS', outputAnalyticsFilters),
    takeEvery('RESET_FILTERS', outputFilters),
    takeEvery('CHOOSE_CAPITAL', outputFilters),
  ])
}
