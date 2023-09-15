import { OrganizationFilters } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { ApiAdminSuper, ApiSuper, methods } from "servises/Axios/AxiosApi";
import { IRequestNomeclature } from "../interfaces/shop.type";

class RequestShopApi extends ApiSuper {

	@methods('get')
	getNomenclature(organization:string){
		return this.request<IRequestNomeclature>(`product/nomenclature?organization=${organization}`)
	}
}

class RequestShopAdmin extends ApiAdminSuper {
 
	@methods('get')
  bannersList(org:string) {
    return this.request(`/display/all?organization=${org}`)
  }

	
}

export const requestShopApi = new RequestShopApi()
export const requestShopAdmin = new RequestShopAdmin()