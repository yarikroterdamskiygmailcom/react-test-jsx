import { all, fork } from 'redux-saga/effects'
import auth from './auth'
import filters from './filters'

export default function* rootSaga() {
  yield all([
    fork(auth),
    fork(filters),
  ])
}
