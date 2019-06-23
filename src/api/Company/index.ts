import Http from 'src/services/Http'
import {
  CreateCompany,
  DeleteCompany,
  GetCompany,
  GetExcel,
  SetCompanyInputsRoles,
  SetPromotionalCode,
  AddCompanyRoleForm,
  DeleteCompanyRoleForm,
  SetCompanyRoleNameForm,
} from 'src/redux/app/company/types'

class Company {
  public static async request(path: string, body?: object): Promise<void> {
    Http.setAuthHeader()

    try {
      const response = await Http.instance.post(`/companies${path}`, body || {})
      return response.data.data
    } catch (error) {
      Http.handleError(error)
    }
  }

  public setPromotionalCode(form: SetPromotionalCode) {
    return Company.request('/set_promotional_code', form)
  }

  public getCompany(form: GetCompany) {
    return Company.request('/choose_company', form)
  }

  public getCompanyAccounts(form: GetCompany) {
    return Company.request('/get_company_accounts', form)
  }

  public getCompanies(userid: object) {
    return Company.request('/get_companies', userid)
  }

  public createCompany(form: CreateCompany) {
    return Company.request('/create_company', form)
  }

  public deleteCompany(form: DeleteCompany) {
    return Company.request('/delete_company', form)
  }

  public createDemoCompany(form: CreateCompany) {
    return Company.request('/create_demo_company', form)
  }

  public getCompanyRoles(form: GetCompany) {
    return Company.request('/get_company_roles', form)
  }

  public getCompanyInputs(form: GetCompany) {
    return Company.request('/get_company_inputs', form)
  }

  public setCompanyInputsRoles(form: SetCompanyInputsRoles) {
    return Company.request('/set_company_inputs_roles', form)
  }

  public excel(form: GetExcel) {
    return Company.request('/excel', form)
  }

  public setCompanyInputsAllRoles(forms: SetCompanyInputsRoles[] | null) {
    const setAllRolesRequest = Promise.all(forms!.map(el => Company.request('/set_company_inputs_roles', el)))
    return new Promise((resolve) => {
      resolve(setAllRolesRequest)
    })
  }

  public addCompanyRole(form: AddCompanyRoleForm) {
    return Company.request('/add_company_role', form)
  }

  public deleteCompanyRole(form: DeleteCompanyRoleForm) {
    return Company.request('/delete_company_role', form)
  }

  public setCompanyRoleName(form: SetCompanyRoleNameForm) {
    return Company.request('/set_company_role_name', form)
  }
}

export default new Company()
