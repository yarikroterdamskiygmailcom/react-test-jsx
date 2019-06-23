import { FiltersData } from 'src/redux/app/types'
import { TableFilterState } from 'src/redux/app/ui/tableFilter/types'

export interface FormProps {
  filtersData: FiltersData | null,
  tableFilter: TableFilterState,
  actions: {
    outputAnalyticsFilters: (filtersData: FiltersData) => void,
  },
}
