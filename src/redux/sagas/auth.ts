import { AnyAction } from 'redux'
import { all, takeEvery } from 'redux-saga/effects'
import Storages from 'src/services/Storages'

function* addUserStorage({ payload }: AnyAction) {
  const user = {
    ...payload.data,
    id: payload.data._id,
    token: payload.token,
  }

  Storages.put('user', user)

  return null
}

function* logOutUser() {
  Storages.put('user', null)

  return null
}

export default function* auth() {
  yield all([
    takeEvery('LOGOUT_USER', logOutUser),
    takeEvery('LOGIN_USER_FULFILLED', addUserStorage),
    takeEvery('REGISTER_USER_FULFILLED', addUserStorage),
  ])
}
