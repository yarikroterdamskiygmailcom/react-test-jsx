import { FormikBag, withFormik } from 'formik'
import * as Yup from 'yup'
import logger from 'src/utils/logger'
import { emailRegex, phoneRegex } from 'src/constants'
import { Step1Data, Step1FormValues } from '../../types'

enum Types {
  PHONE = 'phone',
  EMAIL = 'email',
}

type FormValues = {
  emailOrPhone: string,
}

interface Props {
  checked: boolean,
  onSubmit: (form: Step1FormValues, data: Step1Data) => void
}

const formik = withFormik<Props, FormValues>({
  validationSchema: Yup.object()
    .shape({
      emailOrPhone: Yup.string().required('Это поле является обязательным'),
    }),

  mapPropsToValues: () => ({
    emailOrPhone: '',
  }),

  handleSubmit: async (values: FormValues, { props: { onSubmit }, setSubmitting, setErrors }: FormikBag<Props, FormValues>) => {
    if (!phoneRegex.test(values.emailOrPhone) && !emailRegex.test(values.emailOrPhone)) {
      setSubmitting(false)
      setErrors({ emailOrPhone: 'Введите корректный телефон или email' })
    } else {
      const type = phoneRegex.test(values.emailOrPhone) ? Types.PHONE : Types.EMAIL

      const data = {
        value: values.emailOrPhone,
        source: 'first step registration',
        name: '',
        email: type === Types.EMAIL ? values.emailOrPhone : '',
        phone: type === Types.PHONE ? values.emailOrPhone : '',
        url: window.location.href,
        utm_params: { [type]: values.emailOrPhone }
      }

      try {
        await onSubmit({ [type]: values.emailOrPhone }, data)
      } catch (error) {
        logger.error(error)
        setSubmitting(false)
        setErrors({ emailOrPhone: error.data ? error.data.message : 'Возникли некоторые проблемы' })
      }
    }
    setSubmitting(false)
  },

  displayName: 'FirstRegisterForm',
})

export default formik
