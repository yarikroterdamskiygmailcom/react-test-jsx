import { combineReducers, Reducer } from 'redux'
import { ApplicationState, UiApplicationState } from '../store'

import auth from './auth/reducer'
import company from './company/reducer'
import journal from './journal/reducer'
import currency from './currency/reducer'
import analytics from './analytics/reducer'
import payment from './company/payment/reducer'
import firstForm from './auth/firstForm/reducer'
import reportsAnalytics from './reports/reducer'
import receivables from './reports/receivables/reducer'
import integration from './integration/reducer'
import users from './users/reducer'

import tableFilter from './ui/tableFilter/reducer'
import headerButton from './ui/headerButton/reducer'
import companyDrawer from './ui/companyDrawer/reducer'
import secondaryData from './ui/secondaryData/reducer'

const reducers: Reducer<ApplicationState> =
  combineReducers<ApplicationState>({
    firstForm,
    auth,
    company,
    payment,
    currency,
    journal,
    analytics,
    receivables,
    reportsAnalytics,
    users,
    integration,
    ui: combineReducers<UiApplicationState>({
      headerButton,
      companyDrawer,
      secondaryData,
      tableFilter,
    }),
  })

export type AppState = ReturnType<typeof reducers>

export default reducers
