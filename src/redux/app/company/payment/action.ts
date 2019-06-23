import Payment from 'src/api/Company/Payment'
import { Subscribe, UnsubscribeParams } from './types'

export const SUBSCRIBE = 'SUBSCRIBE'
export const SUBSCRIBE_PENDING = 'SUBSCRIBE_PENDING'
export const SUBSCRIBE_FULFILLED = 'SUBSCRIBE_FULFILLED'
export const SUBSCRIBE_REJECTED = 'SUBSCRIBE_REJECTED'

export const UNSUBSCRIBE = 'UNSUBSCRIBE'
export const UNSUBSCRIBE_PENDING = 'UNSUBSCRIBE_PENDING'
export const UNSUBSCRIBE_FULFILLED = 'UNSUBSCRIBE_FULFILLED'
export const UNSUBSCRIBE_REJECTED = 'UNSUBSCRIBE_REJECTED'

export const CHANGE_TARIFF = 'CHANGE_TARIFF'
export const CHANGE_TARIFF_PENDING = 'CHANGE_TARIFF_PENDING'
export const CHANGE_TARIFF_FULFILLED = 'CHANGE_TARIFF_FULFILLED'
export const CHANGE_TARIFF_REJECTED = 'CHANGE_TARIFF_REJECTED'

const subscribe = (form: Subscribe) => ({
  type: SUBSCRIBE,
  payload: Payment.subscribe(form),
})

const unsubscribe = (form: UnsubscribeParams) => ({
  type: UNSUBSCRIBE,
  payload: Payment.unsubscribe(form),
})

const changeTariff = (form: Subscribe) => ({
  type: CHANGE_TARIFF,
  payload: Payment.changeTariff(form),
})

export default { subscribe, unsubscribe, changeTariff }
