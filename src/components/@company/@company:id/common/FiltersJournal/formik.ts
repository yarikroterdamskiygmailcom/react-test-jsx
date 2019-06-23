import { FormikBag, withFormik } from 'formik'
import { journalFilter } from 'src/constants'
import { InputDataValue, InputValue } from 'src/redux/app/company/types'
import { FiltersType, TableFilterState } from 'src/redux/app/ui/tableFilter/types'
import { FiltersData, Value } from 'src/redux/app/types'
import logger from 'src/utils/logger'
import { FormProps } from './types'

type FormikValue = {
  journal: Value | null,
  accounts: InputDataValue[] | null,
  comment: string,
  tags: InputValue[],
  date: Date[],
  projects: [InputDataValue] | null,
  counterparties: [InputValue] | null,
  operationsTypes: [InputDataValue] | null,
  incomeCategories: [InputDataValue] | null,
  consumptionCategories: [InputDataValue] | null,
}

const formik = withFormik<FormProps, FormikValue>({
  enableReinitialize: true,

  mapPropsToValues: ({ filtersData, tableFilter }: FormProps): FormikValue => {
    const getDate = (tableFilter: TableFilterState, filtersData: FiltersData | null) => {
      if (tableFilter && tableFilter.date) return tableFilter.date

      if (filtersData && (!!filtersData.startDate && !!filtersData.endDate)) {
        return [new Date(filtersData.startDate), new Date(filtersData.endDate)]
      }
      return [new Date(), new Date()]
    }

    return {
      journal: (tableFilter.filters as FiltersType).typesFilter || journalFilter[0],
      date: getDate(tableFilter, filtersData),
      accounts: tableFilter.accounts || null,
      comment: (tableFilter.filters as FiltersType).query || '',
      counterparties: tableFilter.counterparties || null,
      projects: filtersData && filtersData.projects,
      tags: filtersData ? filtersData.tags : [],
      operationsTypes: filtersData && filtersData.operationsTypes,
      incomeCategories: filtersData && filtersData.incomeCategories,
      consumptionCategories: filtersData && filtersData.consumptionCategories,
    }
  },

  handleSubmit: async (
    form: FormikValue,
    { props: { filtersData, actions }, setSubmitting }: FormikBag<FormProps, FormikValue>
  ) => {
    try {
      if (filtersData) {
        const data = {
          ...form,
          endDate: filtersData.endDate,
          startDate: filtersData.startDate,
          months: filtersData.months,
          types: filtersData.types,
        }

        actions.outputJournalFilters(data)
      }
    } catch (error) {
      logger.error(error)
      setSubmitting(false)
    }
    setSubmitting(false)
  },
  displayName: 'FilterForm',
})

export default formik
