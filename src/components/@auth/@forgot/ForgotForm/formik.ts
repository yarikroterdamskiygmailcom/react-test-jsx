import { FormikBag, withFormik } from 'formik'
import * as Yup from 'yup'
import { ForgotFormValues } from '../types'

type Props = {
  onSubmit: ({ email }: ForgotFormValues) => void
}

const formik = withFormik<Props, ForgotFormValues>({
  validationSchema: Yup.object()
    .shape({
      email: Yup.string()
        .email('Неправильный email адрес!')
        .required('Это поле является обязательным'),
    }),

  mapPropsToValues: () => ({
    email: '',
  }),

  handleSubmit: async (form: ForgotFormValues, { props: { onSubmit }, setErrors, setSubmitting }: FormikBag<Props, ForgotFormValues>) => {
    try {
      await onSubmit(form)
    } catch (error) {
      setSubmitting(false)
      setErrors({ email: error.data ? error.data.message.response : 'Возникли некоторые проблемы' })
    }
    setSubmitting(false)
  },
  displayName: 'ForgotForm',
})

export default formik
