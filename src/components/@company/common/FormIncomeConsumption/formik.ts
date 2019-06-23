import { FormikBag, withFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import logger from 'src/utils/logger'
import { FormikValue, FormProps } from './types'
import { getIndexPeriods, getPeriodsValue } from 'src/utils/journalHelpers'
import { getValue } from 'src/utils/getValue'
import get from 'lodash/get'

const formik = withFormik<FormProps, FormikValue>({
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    sum: Yup.string().required('Это поле является обязательным'),
    date: Yup.string().required('Это поле является обязательным'),
    account: Yup.string().required('Это поле является обязательным'),
    counterparty: Yup.string().required('Это поле является обязательным'),
  }),

  mapPropsToValues: ({ journalData, analyticsData }: FormProps): FormikValue => {
    const data = journalData || analyticsData

    return {
      sum: get(data, 'sum', ''),
      tags: get(journalData, 'tags', []),
      repeat: data ? !!data.repeatable : false,
      comment: get(data, 'comment', ''),
      date: get(data, 'date', new Date()),
      scheduled: get(data, 'scheduled', false),
      income: get(data, 'category.value', ''),
      consumption: get(data, 'category.value', ''),
      account: get(data, 'account.value', ''),
      projects: get(data, 'project.value', ''),
      repeatMonth: get(data, 'repeatable.value', ''),
      counterparty: get(data, 'counterparty.value', ''),
    }
  },

  handleSubmit: async (
    form: FormikValue,
    { props: { user, schedulePeriods, company, journalData, analyticsData, isIncomeOpened, isConsumptionOpened, onSubmit }, setSubmitting }
      : FormikBag<FormProps, FormikValue>
  ) => {
    const journalAnalyticsData = journalData || analyticsData

    const getOperationType = () => {
      if (isIncomeOpened) return 'income'
      if (isConsumptionOpened) return 'consumption'
    }

    const schedulePeriodsValue = (formValue: string) => {
      const index = getIndexPeriods(schedulePeriods, formValue)
      return getPeriodsValue(schedulePeriods, index)
    }

    const fieldValueDate = !(form.date instanceof Date) && moment(form.date, 'DD.MM.YYYY')

    const category = () => {
      const categoryValue = getValue(form.income || form.consumption,
                                     `${isIncomeOpened ? 'income' : (isConsumptionOpened && 'consumption')}`)
      if (categoryValue) return categoryValue

      if (isIncomeOpened) return form.income
      if (isConsumptionOpened) return form.consumption

      return null
    }

    const data = {
      sum: +form.sum,
      tags: form.tags,
      category: category(),
      comment: form.comment,
      user_id: user && user.id,
      scheduled: form.scheduled,
      company_id: company && company._id,
      operationType: getOperationType() as string,
      repeatable: schedulePeriodsValue(form.repeatMonth),
      date: moment(fieldValueDate || form.date).format(),
      account: getValue(form.account, 'accounts'),
      project: getValue(form.projects, 'projects'),
      counterparty: getValue(form.counterparty, 'counterparty'),
      transaction_id: journalAnalyticsData ? journalAnalyticsData._id : null,
    }

    try {
      await onSubmit(data)
    } catch (error) {
      logger.error(error)
      setSubmitting(false)
    }
    setSubmitting(false)
  },
  displayName: 'DialogIncomeForm',
})

export default formik
