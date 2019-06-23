import auth from './auth/action'
import company from './company/action'
import currency from './currency/action'
import journal from './journal/action'
import analytics from './analytics/action'
import headerButton from './ui/headerButton/action'
import companyDrawer from './ui/companyDrawer/action'
import secondaryData from './ui/secondaryData/reducer'
import tableFilter from './ui/tableFilter/reducer'

export default {
  auth,
  company,
  currency,
  journal,
  analytics,
  ui: {
    headerButton,
    companyDrawer,
    secondaryData,
    tableFilter,
  },
}
