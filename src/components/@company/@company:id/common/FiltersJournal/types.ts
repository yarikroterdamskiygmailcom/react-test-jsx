import { User } from 'src/redux/app/auth/types'
import { Company } from 'src/redux/app/company/types'
import { FiltersData } from 'src/redux/app/types'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'

export interface FormProps {
  user: User | null,
  company: Company | null,
  filtersData: FiltersData | null,
  tableFilter: TableFilterState,
  actions: {
    outputJournalFilters: (filtersData: FiltersData) => void,
  },
}
