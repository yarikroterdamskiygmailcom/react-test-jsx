import { AnyAction } from 'redux'
import { HeaderButtonState } from './types'
import {
  CLOSE_CONSUMPTION,
  CLOSE_INCOME,
  CLOSE_TRANSFER,
  DISABLED_REPEAT,
  ENABLED_REPEAT,
  OPEN_CONSUMPTION,
  OPEN_INCOME,
  OPEN_TRANSFER
} from './action'

const initialState: HeaderButtonState = {
  isIncomeOpened: false,
  isConsumptionOpened: false,
  isTransferOpened: false,
  isRepeatDisabled: true,
}

const headerButtonReducer = (state = initialState, { type }: AnyAction) => {
  switch (type) {
    case OPEN_INCOME:
      return {
        ...state,
        isIncomeOpened: true,
      }
    case CLOSE_INCOME:
      return {
        ...state,
        isIncomeOpened: false,
      }

    case OPEN_CONSUMPTION:
      return {
        ...state,
        isConsumptionOpened: true,
      }
    case CLOSE_CONSUMPTION:
      return {
        ...state,
        isConsumptionOpened: false,
      }

    case OPEN_TRANSFER:
      return {
        ...state,
        isTransferOpened: true,
      }
    case CLOSE_TRANSFER:
      return {
        ...state,
        isTransferOpened: false,
      }

    case ENABLED_REPEAT:
      return {
        ...state,
        isRepeatDisabled: false,
      }
    case DISABLED_REPEAT:
      return {
        ...state,
        isRepeatDisabled: true,
      }

    default:
      return state
  }
}

export default headerButtonReducer
