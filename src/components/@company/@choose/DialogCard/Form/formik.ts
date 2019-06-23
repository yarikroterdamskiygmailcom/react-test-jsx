import { FormikBag, withFormik } from 'formik'
import * as Yup from 'yup'
import logger from 'src/utils/logger'
import { ChooseCompany, Currency } from '../../types'

type Props = {
  error: string | null,
  currencies: [Currency] | null,
  onSubmit: (form: ChooseCompany) => void,
}

const formik = withFormik<Props, ChooseCompany>({
  validationSchema: Yup.object()
    .shape({
      name: Yup.string().required('Это поле является обязательным'),
      currency: Yup.string().required('Это поле является обязательным'),
    }),

  mapPropsToValues: () => ({
    name: '',
    isDemo: false,
    currency: null,
  }),

  handleSubmit: async (form: ChooseCompany, { props: { onSubmit }, setSubmitting }: FormikBag<Props, ChooseCompany>) => {
    try {
      await onSubmit(form)
    } catch (error) {
      logger.error(error)
      setSubmitting(false)
    }
    setSubmitting(false)
  },
  displayName: 'ForgotForm',
})

export default formik
