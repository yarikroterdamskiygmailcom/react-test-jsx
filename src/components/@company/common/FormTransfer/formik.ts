import * as Yup from 'yup'
import moment from 'moment'
import get from 'lodash/get'
import logger from 'src/utils/logger'
import { FormikBag, withFormik } from 'formik'
import { FormikValue, FormProps } from './types'
import { getIndexPeriods, getPeriodsValue, } from 'src/utils/journalHelpers'
import { getValue } from 'src/utils/getValue'

const formik = withFormik<FormProps, FormikValue>({
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    sum: Yup.string().required('Это поле является обязательным'),
    date: Yup.string().required('Это поле является обязательным'),
    accountTo: Yup.string().required('Это поле является обязательным'),
    accountFrom: Yup.string().required('Это поле является обязательным'),
  }),

  mapPropsToValues: ({ journalData, analyticsData, chosenCounterparty }: FormProps): FormikValue => {
    const data = journalData || analyticsData || chosenCounterparty

    return {
      sum: get(data, 'sum', ''),
      tags: get(data, 'tags', []),
      repeat: data ? !!data.repeatable : false,
      comment: get(data, 'comment', ''),
      scheduled: get(data, 'scheduled', false),
      repeatMonth: get(data, 'repeatable.value', ''),
      accountTo: get(data, 'accountTo.value', ''),
      accountFrom: get(data, 'accountFrom.value', ''),
      exchangeRate: get(data, 'exchange_rate', ''),
      exchangeRateInput: '',
      date: get(data, 'date', new Date()),
      incomeCategory: get(data, 'incomeCategory.value', null),
      consumptionCategory: get(data, 'consumptionCategory.value', null),
      counterpartyTo: get(data, 'counterpartyTo.value', null),
      counterpartyFrom: get(data, 'counterpartyFrom.value', null),
      projectsTransfer: get(data, 'project.value', null),
    }
  },

  handleSubmit: async (
    form: FormikValue,
    {
      props: {
        user,
        company,
        journalData,
        analyticsData,
        schedulePeriods,
        onSubmit
      },
      setSubmitting
    }: FormikBag<FormProps, FormikValue>
  ) => {
    const journalAnalyticsData = journalData || analyticsData

    const schedulePeriodsValue = (formValue: string) => {
      const index = getIndexPeriods(schedulePeriods, formValue)
      return getPeriodsValue(schedulePeriods, index)
    }

    const fieldValueDate = !(form.date instanceof Date) && moment(form.date, 'DD.MM.YYYY')

    const data = {
      sum: +form.sum,
      tags: form.tags,
      comment: form.comment,
      operationType: 'transfer',
      user_id: user && user.id,
      scheduled: form.scheduled,
      date: moment(fieldValueDate || form.date).format(),
      company_id: company && company._id,
      repeatable: schedulePeriodsValue(form.repeatMonth),
      accountTo: getValue(form.accountTo, 'accounts'),
      accountFrom: getValue(form.accountFrom, 'accounts'),
      project: getValue(form.projectsTransfer!, 'projects'),
      income_category: getValue(form.incomeCategory!, 'income'),
      counterpartyTo: getValue(form.counterpartyTo!, 'counterparty'),
      counterpartyFrom: getValue(form.counterpartyFrom!, 'counterparty'),
      consumption_category: getValue(form.consumptionCategory!, 'consumption'),
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
