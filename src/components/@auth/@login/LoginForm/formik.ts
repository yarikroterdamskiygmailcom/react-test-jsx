import { FormikBag, withFormik } from 'formik'
import * as Yup from 'yup'
import transformValidationApi from 'src/utils/transformValidationErrors'
import { LoginFormValues } from '../types'

interface Props {
  onSubmit: (form: LoginFormValues) => void
}

const formik = withFormik<Props, LoginFormValues>({
  validationSchema: Yup.object()
    .shape({
      email: Yup.string()
        .email('Неправильный email адрес!')
        .required('Это поле является обязательным'),
      password: Yup.string()
        .required('Это поле является обязательным'),
    }),

  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),

  handleSubmit: async (
    form: LoginFormValues,
    { props: { onSubmit }, setErrors, setSubmitting }: FormikBag<Props, LoginFormValues>,
  ): Promise<void> => {
    try {
      await onSubmit(form)
    } catch (error) {
      setSubmitting(false)
      setErrors(error.data ? transformValidationApi(error) : { password: 'Возникли некоторые проблемы' })
    }
    setSubmitting(false)
  },
  displayName: 'LoginForm',
})

export default formik
