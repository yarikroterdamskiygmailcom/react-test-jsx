import Companies from 'src/api/Company'
import { CreateCompany, DeleteCompany, GetCompany, GetExcel, SetPromotionalCode } from './types'

export const GET_COMPANY = 'GET_COMPANY'
export const GET_COMPANY_PENDING = 'GET_COMPANY_PENDING'
export const GET_COMPANY_FULFILLED = 'GET_COMPANY_FULFILLED'
export const GET_COMPANY_REJECTED = 'GET_COMPANY_REJECTED'

export const GET_COMPANY_ACCOUNTS = 'GET_COMPANY_ACCOUNTS'
export const GET_COMPANY_ACCOUNTS_PENDING = 'GET_COMPANY_ACCOUNTS_PENDING'
export const GET_COMPANY_ACCOUNTS_FULFILLED = 'GET_COMPANY_ACCOUNTS_FULFILLED'
export const GET_COMPANY_ACCOUNTS_REJECTED = 'GET_COMPANY_ACCOUNTS_REJECTED'

export const GET_COMPANIES = 'GET_COMPANIES'
export const GET_COMPANIES_PENDING = 'GET_COMPANIES_PENDING'
export const GET_COMPANIES_FULFILLED = 'GET_COMPANIES_FULFILLED'
export const GET_COMPANIES_REJECTED = 'GET_COMPANIES_REJECTED'

export const SET_PROMOTIONAL_CODE = 'SET_PROMOTIONAL_CODE'
export const SET_PROMOTIONAL_CODE_PENDING = 'SET_PROMOTIONAL_CODE_PENDING'
export const SET_PROMOTIONAL_CODE_FULFILLED = 'SET_PROMOTIONAL_CODE_FULFILLED'
export const SET_PROMOTIONAL_CODE_REJECTED = 'SET_PROMOTIONAL_CODE_REJECTED'

export const CREATE_COMPANY = 'CREATE_COMPANY'
export const CREATE_COMPANY_PENDING = 'CREATE_COMPANY_PENDING'
export const CREATE_COMPANY_FULFILLED = 'CREATE_COMPANY_FULFILLED'
export const CREATE_COMPANY_REJECTED = 'CREATE_COMPANY_REJECTED'

export const DELETE_COMPANY = 'DELETE_COMPANY'
export const DELETE_COMPANY_PENDING = 'DELETE_COMPANY_PENDING'
export const DELETE_COMPANY_FULFILLED = 'DELETE_COMPANY_FULFILLED'
export const DELETE_COMPANY_REJECTED = 'DELETE_COMPANY_REJECTED'

export const CREATE_DEMO_COMPANY = 'CREATE_COMPANY'
export const CREATE_DEMO_COMPANY_PENDING = 'CREATE_COMPANY_DEMO_PENDING'
export const CREATE_DEMO_COMPANY_FULFILLED = 'CREATE_COMPANY_DEMO_FULFILLED'
export const CREATE_DEMO_COMPANY_REJECTED = 'CREATE_COMPANY_DEMO_REJECTED'

export const EXCEL = 'EXCEL'
export const EXCEL_PENDING = 'EXCEL_PENDING'
export const EXCEL_FULFILLED = 'EXCEL_FULFILLED'
export const EXCEL_REJECTED = 'EXCEL_REJECTED'

export const LEAVE_COMPANY = 'LEAVE_COMPANY'

const setPromotionalCode = (form: SetPromotionalCode) => ({
  type: SET_PROMOTIONAL_CODE,
  payload: Companies.setPromotionalCode(form),
})

const getCompany = (form: GetCompany, isButtonVisible?: boolean) => ({
  type: GET_COMPANY,
  payload: Companies.getCompany(form),
  meta: isButtonVisible,
})

const getCompanyAccounts = (form: GetCompany) => ({
  type: GET_COMPANY_ACCOUNTS,
  payload: Companies.getCompanyAccounts(form),
})

const leaveCompany = () => ({
  type: LEAVE_COMPANY
})

const getCompanies = (userId: object) => ({
  type: GET_COMPANIES,
  payload: Companies.getCompanies(userId),
})

const createCompany = (form: CreateCompany) => ({
  type: CREATE_COMPANY,
  payload: Companies.createCompany(form),
})

const deleteCompany = (form: DeleteCompany) => ({
  type: DELETE_COMPANY,
  payload: Companies.deleteCompany(form),
})

const createDemoCompany = (form: CreateCompany) => ({
  type: CREATE_DEMO_COMPANY,
  payload: Companies.createDemoCompany(form),
})

const excel = (form: GetExcel) => ({
  type: EXCEL,
  payload: Companies.excel(form),
})

export default {
  setPromotionalCode,
  leaveCompany,
  getCompany,
  getCompanies,
  createCompany,
  deleteCompany,
  createDemoCompany,
  getCompanyAccounts,
  excel,
}
