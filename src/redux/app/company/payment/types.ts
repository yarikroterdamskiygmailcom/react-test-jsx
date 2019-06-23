export type PaymentState = {
  errors: object,
  isError: boolean,
  loading: boolean,
  payment: Payment | null,
}

export type Payment = {
  payment_id: string,
  response_status: string,
  checkout_url: string,
}

export type Subscribe = {
  amount: string,
  order_desc: string,
  tariff_type: string,
  tariff_id: string,
  tariff_term: string,
  company_id: string,
  company_name: string,
  user_email: string,
  user_name: string,
  promotional_code: string | null,
}

export type UnsubscribeParams = {
  userId: string,
  _id: string,
}
