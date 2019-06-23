import { applyMiddleware, createStore } from 'redux'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'src/redux/sagas'
import reducers from 'src/redux/app/reducers'
import { FirstFormState } from './app/auth/firstForm/types'
import { AuthState } from './app/auth/types'
import { CompanyState } from './app/company/types'
import { CurrencyState } from './app/currency/types'
import { PaymentState } from './app/company/payment/types'
import { HeaderButtonState } from './app/ui/headerButton/types'
import { CompanyDrawerState } from './app/ui/companyDrawer/types'
import { TableFilterState } from './app/ui/tableFilter/types'
import { SecondaryState } from './app/ui/secondaryData/types'
import { JournalState } from './app/journal/types'
import { AnalyticsState } from './app/analytics/types'
import { AnalyticsProjectsDataType } from './app/reports/types'
import { ReceivablesState } from './app/reports/receivables/types'
import { IntegrationState } from './app/integration/types'
import { UsersState } from './app/users/types'

const sagaMiddleware = createSagaMiddleware()

export type UiApplicationState = {
  headerButton: HeaderButtonState,
  companyDrawer: CompanyDrawerState,
  tableFilter: TableFilterState,
  secondaryData: SecondaryState,
}

export type ApplicationState = {
  firstForm: FirstFormState,
  auth: AuthState,
  company: CompanyState,
  payment: PaymentState,
  currency: CurrencyState,
  journal: JournalState,
  analytics: AnalyticsState,
  receivables: ReceivablesState,
  integration: IntegrationState,
  users: UsersState,
  ui: UiApplicationState,
  reportsAnalytics: AnalyticsProjectsDataType,
}

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      promise,
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(rootSaga)

export default store
