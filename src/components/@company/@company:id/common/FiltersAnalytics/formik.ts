import { FormikBag, withFormik } from 'formik'
import { AnalyticsValue, FiltersType } from 'src/redux/app/ui/tableFilter/types'
import { InputDataValue, InputValue } from 'src/redux/app/company/types'
import { analyticsCategory } from 'src/constants'
import { Value } from 'src/redux/app/types'
import logger from 'src/utils/logger'
import { FormProps } from './types'

type FormikValue = {
  analytics: AnalyticsValue[],
  reportType: AnalyticsValue[],
  category: Value,
  comment: string,
  tags: InputValue[],
  date: [Date, Date] | null,
  projects: [InputDataValue] | null,
  counterparties: [InputValue] | null,
  operationsTypes: [InputDataValue] | null,
  incomeCategories: [InputDataValue] | null,
  consumptionCategories: [InputDataValue] | null,
}

const formik = withFormik<FormProps, FormikValue>({
  enableReinitialize: true,

  mapPropsToValues: ({ filtersData, tableFilter }: FormProps): FormikValue => ({
    analytics: tableFilter.analyticsPage,
    reportType: tableFilter.reportType,
    category: tableFilter.category || analyticsCategory[0],
    date: (tableFilter && tableFilter.date) || (filtersData && (!!filtersData.startDate && !!filtersData.endDate)
      ? [new Date(filtersData.startDate), new Date(filtersData.endDate)]
      : [new Date(), new Date()]),
    comment: (tableFilter.filters as FiltersType).query || '',
    counterparties: tableFilter.counterparties || null,
    projects: filtersData && filtersData.projects,
    tags: filtersData ? filtersData.tags : [],
    operationsTypes: filtersData && filtersData.operationsTypes,
    incomeCategories: filtersData && filtersData.incomeCategories,
    consumptionCategories: filtersData && filtersData.consumptionCategories,
  }),

  handleSubmit: async (
    form: FormikValue,
    { props: { filtersData, actions }, setSubmitting }: FormikBag<FormProps, FormikValue>
  ) => {
    try {
      const funcAnalyticsValue = (data: AnalyticsValue[]) => {
        let returnedString: string = ''
        data.map(value => value.selected && (returnedString = value.value))

        return returnedString
      }

      if (filtersData) {
        const data = {
          ...form,
          reportType: funcAnalyticsValue(form.reportType),
          operationType: funcAnalyticsValue(form.analytics),
          category: form.category.value,
          categoryForm: form.category,
          reportTypeForm: form.reportType,
          endDate: filtersData.endDate,
          startDate: filtersData.startDate,
          months: filtersData.months,
          types: filtersData.types,
        }

        actions.outputAnalyticsFilters(data)
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
