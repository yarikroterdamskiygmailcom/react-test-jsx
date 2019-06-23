import { FormikBag, withFormik } from 'formik'
import * as Yup from 'yup'
import { PromoCode } from '../types'

type Props = {
  onSubmit: ({ promoCode }: PromoCode) => void
}

const formik = withFormik<Props, PromoCode>({
  validationSchema: Yup.object()
    .shape({
      promoCode: Yup.string().required('Это поле является обязательным'),
    }),

  mapPropsToValues: () => ({
    promoCode: '',
  }),

  handleSubmit: async (form: PromoCode, { props: { onSubmit }, setErrors, setSubmitting }: FormikBag<Props, PromoCode>) => {
    try {
      await onSubmit(form)
    } catch (error) {
      setSubmitting(false)
      setErrors({ promoCode: error.data.message })
    }
    setSubmitting(false)
  },
  displayName: 'ForgotForm',
})

export default formik
