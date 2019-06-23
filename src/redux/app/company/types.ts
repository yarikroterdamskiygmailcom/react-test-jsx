import { ExchangeRateValue } from 'src/redux/app/currency/types'
import { Currency } from 'src/components/@company/@choose/types'

export type CompanyState = {
  errors: object,
  isError: boolean,
  loading: boolean,
  isButtonVisible: boolean,
  accounts: Accounts | null,
  currentCompany: Company | null,
  companies: [Company] | null,
  fileName: string | null,
}

export type GetCompany = {
  company_id: string,
  user_id: string,
}

export type GetExcel = {
  company_id: string,
  user_id: string,
}

export type CreateCompany = {
  user_id: string,
  company_name: string,
  currency: Currency | null,
  promotional_code: string | null,
}

export type DeleteCompany = {
  user_id: string,
  company_id: string,
  is_owner: boolean,
}

export type Company = {
  _id: string,
  name: string,
  currency: ExchangeRateValue,
  demo_company: boolean,
  tariff: {
    _id: string,
    name: string,
    value: string,
    label: string,
  },
  users: Users[],
  subscription: {
    is_active: boolean,
  },
  inputs: {
    [key: string]: Accounts,
  },
  tariff_term: string,
  creation_date: string,
  tariff_days_left: number,
  promotional_code: string | null,
}

export type SetPromotionalCode = {
  company_id: string,
  promotional_code: string,
}

export type Accounts = {
  _id: string,
  _ids?: number[],
  inputIdName?: string,
  inputType?: string,
  inputName?: string,
  accounts_types?: InputValue[],
  parent?: boolean,
  placeholder?: string,
  data: InputDataValue[],
}

export type InputDataValue = {
  _id: string,
  // _ids: Ids[],
  _ids: number[],
  label: string,
  value: string,
  parent: boolean,
  balance?: number,
  selected?: boolean,
  archived?: boolean,
  inputIdName?: string,
  not_deletable?: boolean,
  starting_balance?: number,
  account_type?: InputValue,
  account_currency?: Currency,
  balance_after_transaction?: string,
}

export type InputValue = {
  _id: string,
  // _ids: Ids[],
  _ids: number[],
  label: string,
  value: string,
  parent: boolean,
  selected?: boolean,
}

export type SmallValue = {
  label: string,
  value: string,
  selected?: boolean,
}

export type Users = {
  name: string,
  user_id: string,
  role_id: number,
  is_owner: boolean,
}

export type Ids = {
  [key: number]: number
}

export type SetCompanyInputsRoles = {
  checked: boolean,
  child_input_id: string,
  company_id: string,
  input_id: string,
  input_id_name: string,
  operation_type?: string,
  parent: boolean,
  role_id: number,
  user_id: string,
  _ids?: number[]
}

export type AddCompanyRoleForm = {
  company_id: string,
  role_name: string,
  user_id: string,
}

export type DeleteCompanyRoleForm = {
  company_id: string,
  role_id: number,
  user_id: string,
}

export type SetCompanyRoleNameForm = {
  company_id: string,
  role_id: number,
  role_name: string,
  user_id: string,
}
