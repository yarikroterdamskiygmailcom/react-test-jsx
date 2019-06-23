import { FormikBag, withFormik } from 'formik'
import * as Yup from 'yup'
import logger from 'src/utils/logger'
import { MIN_PASSWORD_LENGTH } from 'src/constants'
import transformValidationApi from 'src/utils/transformValidationErrors'
import { MainFormValues } from '../../types'

interface Props {
  email?: string,
  phone?: string,
  leedId?: string,
  checked: boolean,
  onSubmit: (form: MainFormValues) => void
}

const formik = withFormik<Props, MainFormValues>({
  enableReinitialize: true,

  validationSchema: Yup.object()
    .shape({
      name: Yup.string().required('Это поле является обязательным'),
      phone: Yup.string().required('Это поле является обязательным'),
      email: Yup.string()
        .email('Неправильный email адрес!')
        .required('Это поле является обязательным'),
      password: Yup.string()
        .min(MIN_PASSWORD_LENGTH, 'Пароль должен быть больше чем 6 символов')
        .required('Это поле является обязательным'),
      confirmPassword: Yup.string()
        .min(MIN_PASSWORD_LENGTH, 'Пароль должен быть больше чем 6 символов')
        .required('Это поле является обязательным'),
    }),

  mapPropsToValues: ({ email, phone }: Props): MainFormValues => ({
    name: '',
    email: email || '',
    phone: phone || '',
    password: '',
    confirmPassword: '',
    confirm: false,
  }),

  handleSubmit: async (form: MainFormValues, { props: { onSubmit, leedId }, setErrors, setSubmitting }: FormikBag<Props, MainFormValues>) => {
    if (!form.confirm) {
      setSubmitting(false)
      setErrors({ confirm: 'Вы должны согласиться с условиями соглашения' })

      return
    }
    if (form.password !== form.confirmPassword) {
      setSubmitting(false)
      setErrors({ confirmPassword: 'Пароли не совпадают' })

      return
    }

    const data = {
      ...form,
      leed_id: leedId
    }

    try {
      await onSubmit(data)
    } catch (error) {
      logger.error(error)
      setSubmitting(false)
      setErrors(error.data ? transformValidationApi(error) : { confirmPassword: 'Возникли некоторые проблемы' })
    }
    setSubmitting(false)
  },

  displayName: 'MainRegisterForm',
})

export default formik
