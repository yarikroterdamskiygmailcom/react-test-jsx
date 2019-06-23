import { InputDataValue } from 'src/redux/app/company/types'
import { FiltersKey } from 'src/redux/app/ui/tableFilter/types'

export const getCheckedFilters = (key: string, value: InputDataValue, constant: string, checkedReturn: FiltersKey | {}) => {
  let checkedData = { ...checkedReturn }

  if (key === constant) {
    checkedData = {
      ...checkedData,
      [value._id]: !!value.selected
    }
  }

  return checkedData
}

export const getCheckedAccountsFilters = (value: InputDataValue, checkedReturn: FiltersKey | {}) => {
  let checkedData = { ...checkedReturn }

  checkedData = {
    ...checkedData,
    [value._id]: !!value.selected
  }

  return checkedData
}
