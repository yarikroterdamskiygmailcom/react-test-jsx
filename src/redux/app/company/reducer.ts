import { AnyAction } from 'redux'
import { CompanyState, InputDataValue } from './types'
import {
  CREATE_COMPANY_FULFILLED,
  CREATE_COMPANY_PENDING,
  CREATE_COMPANY_REJECTED,
  CREATE_DEMO_COMPANY_FULFILLED,
  CREATE_DEMO_COMPANY_PENDING,
  CREATE_DEMO_COMPANY_REJECTED,
  DELETE_COMPANY_FULFILLED,
  DELETE_COMPANY_PENDING,
  DELETE_COMPANY_REJECTED,
  GET_COMPANIES_FULFILLED,
  GET_COMPANIES_PENDING,
  GET_COMPANIES_REJECTED,
  GET_COMPANY_ACCOUNTS_FULFILLED,
  GET_COMPANY_ACCOUNTS_PENDING,
  GET_COMPANY_ACCOUNTS_REJECTED,
  GET_COMPANY_FULFILLED,
  GET_COMPANY_PENDING,
  GET_COMPANY_REJECTED,
  LEAVE_COMPANY,
  SET_PROMOTIONAL_CODE_FULFILLED,
  SET_PROMOTIONAL_CODE_PENDING,
  SET_PROMOTIONAL_CODE_REJECTED,
  EXCEL_PENDING,
  EXCEL_FULFILLED,
  EXCEL_REJECTED,
} from './action'

const initialState: CompanyState = {
  errors: {},
  accounts: null,
  isError: false,
  loading: false,
  companies: null,
  isButtonVisible: false,
  currentCompany: null,
  fileName: null,
}

const companyReducer = (state = initialState, { type, payload, meta }: AnyAction) => {
  switch (type) {
    case EXCEL_PENDING:
    case GET_COMPANY_PENDING:
    case GET_COMPANIES_PENDING:
    case CREATE_COMPANY_PENDING:
    case DELETE_COMPANY_PENDING:
    case CREATE_DEMO_COMPANY_PENDING:
    case SET_PROMOTIONAL_CODE_PENDING:
    case GET_COMPANY_ACCOUNTS_PENDING:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: true,
      }

    case EXCEL_REJECTED:
    case GET_COMPANY_REJECTED:
    case GET_COMPANIES_REJECTED:
    case CREATE_COMPANY_REJECTED:
    case DELETE_COMPANY_REJECTED:
    case CREATE_DEMO_COMPANY_REJECTED:
    case SET_PROMOTIONAL_CODE_REJECTED:
    case GET_COMPANY_ACCOUNTS_REJECTED:
      return {
        ...state,
        loading: false,
        isError: true,
        errors: payload,
      }

    case CREATE_COMPANY_FULFILLED:
    case DELETE_COMPANY_FULFILLED:
    case CREATE_DEMO_COMPANY_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
      }

    case GET_COMPANY_FULFILLED: {
      type CompanyInputs = {
        [key: string]: InputDataValue,
      }
      const inputs: CompanyInputs = {}

      Object.keys(payload.inputs).forEach((key: string) =>
        inputs[key] = Array.isArray(payload.inputs[key]) ? payload.inputs[key][0] : payload.inputs[key])

      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        currentCompany: {
          ...payload,
          inputs,
        },
        isButtonVisible: meta || false,
      }
    }

    case GET_COMPANIES_FULFILLED: {
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        companies: payload,
      }
    }

    case GET_COMPANY_ACCOUNTS_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        accounts: payload,
      }

    case LEAVE_COMPANY:
      return {
        ...state,
        isButtonVisible: false,
        currentCompany: null,
      }

    case SET_PROMOTIONAL_CODE_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
      }

    case EXCEL_FULFILLED:
      return {
        ...state,
        errors: {},
        isError: false,
        loading: false,
        fileName: payload,
      }

    default:
      return state
  }
}

export default companyReducer
