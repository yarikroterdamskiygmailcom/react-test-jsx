import { AnyAction } from 'redux'
import { CompanyDrawerState } from './types'
import { CLOSE_DRAWER, OPEN_DRAWER } from './action'

const initialState: CompanyDrawerState = {
  isDrawerOpened: false,
}

const companyDrawerReducer = (state = initialState, { type }: AnyAction) => {
  switch (type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpened: true,
      }

    case CLOSE_DRAWER:
      return {
        ...state,
        isDrawerOpened: false,
      }

    default:
      return state
  }
}

export default companyDrawerReducer
