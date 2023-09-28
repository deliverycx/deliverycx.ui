import { OrganizationFilters } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { ApiAdminSuper, ApiSuper, methods } from "servises/Axios/AxiosApi";
import { IProduct, IRequestNomeclature, IStopList } from "../interfaces/shop.type";
import { AjaxApiSuper } from "servises/rxjs/AjaxApi";

class RequestShopApi extends ApiSuper {

	@methods('get')
	getNomenclature(organization:string){
		return this.request<IRequestNomeclature>(`product/nomenclature?organization=${organization}`)
	}

	@methods('get')
	getAdditionProducts(organization:string){
		return this.request<IProduct[]>(`product/additionProducts?organization=${organization}`)
	}

	@methods('get')
  stoplist(org:string) {
    return this.request<IStopList[]>(`/stoplist/getStopList/?organizationId=${org}`)
  }
}

class RequestShopAjax extends AjaxApiSuper {
 
  @methods('get')
  stoplist(org:string) {
    return this.request<IStopList[]>(`stoplist/getStopList/?organizationId=${org}`)
  }
}

class RequestShopAdmin extends ApiAdminSuper {
 
	@methods('get')
  bannersList(org:string) {
    return this.request(`/display/all?organization=${org}`)
  }

	
}

export const requestShopAjax =  new RequestShopAjax()
export const requestShopApi = new RequestShopApi()
export const requestShopAdmin = new RequestShopAdmin()