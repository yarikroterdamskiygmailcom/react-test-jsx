export type MainFormValues = {
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  confirm: boolean,
  leed_id?: string,
}

export type Step1FormValues = {
  [key: string]: string,
}

export type Step1Data = {
  value: string,
  source: string,
  name: string,
  email: string,
  phone: string,
  url: string,
  utm_params?: object,
}
