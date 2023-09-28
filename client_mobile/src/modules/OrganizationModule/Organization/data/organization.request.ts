import { ICityResponse } from "modules/CityModule/interfaces/city.type"
import { ApiAdminSuper, ApiSuper, methods } from "servises/Axios/AxiosApi"
import { AjaxApiSuper } from "servises/rxjs/AjaxApi"
import type { IOrganization, OrganizationFilters, pointSerch } from "../interfaces/organization.type"

class RequestOrganization extends AjaxApiSuper {
 
  @methods('get')
  getAll(cityId:string) {
    return this.request<ICityResponse[]>(`organization/all?cityId=${cityId}`)
  }

	@methods('post')
	filterPoint(data:any){
		return this.request(`organization/filter`)
	}

	@methods('post')
	pointSerch(body:pointSerch){
		return this.request<IOrganization[]>(`organization/serch`)
	}

	@methods('get')
	getOrg(orgid:string) {
    return this.request<ICityResponse[]>(`organization/buguid?organizationId=${orgid}`)
  }
}


class RequestOrganizationApi extends ApiSuper {
	@methods('post')
	pointSerch(body:any){
		return this.request<IOrganization[]>(`organization/serch`)
	}
}


class RequestOrganizationAdmin extends ApiAdminSuper {
 
  @methods('get')
  getFilters() {
    return this.request<OrganizationFilters[]>(`/organizationfilter/all?id=''`)
  }

	
}
export const requestOrganizationAdmin = new RequestOrganizationAdmin()
export const requestOrganizationApi = new RequestOrganizationApi()
export const requestOrganization = new RequestOrganization()