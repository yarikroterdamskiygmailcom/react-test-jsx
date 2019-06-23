export type ChooseCompany = {
  name: string,
  currency: Currency | null,
  isDemo: boolean,
}

export type Currency = {
  _id: string,
  name: string,
  code: string,
  value: string,
  label: string,
  symbol: string,
  name_russian: string,
}
