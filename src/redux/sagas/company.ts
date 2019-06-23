import { all, put, takeEvery } from 'redux-saga/effects'
import actions from '../app/actions'

function* setOperationPending() {
  yield put(actions.analytics.setOperationPending())
}

function* setOperationFulfilled() {
  yield put(actions.analytics.setOperationFulfilled())
}

export default function* filters() {
  yield all([
    takeEvery('SET_OPERATION_PENDING', setOperationPending),
    takeEvery('SET_OPERATION_FULFILLED', setOperationFulfilled),
  ])
}
