import { ApiSuper, methods } from "servises/Axios/AxiosApi"
import { AjaxApiSuper } from "servises/rxjs/AjaxApi"
import { ICityResponse } from "../interfaces/city.type"





class RequestCityAjax extends AjaxApiSuper {
 
  @methods('get')
  getAll(city:string) {
    return this.request(`city/all?search=${city}`)
  }
	@methods('get')
  geBuCity(city:string) {
    return this.request(`/city/buid?id=${city}`)
  }
	@methods('get')
  geBuOrg(orgid:string) {
    return this.request(`/organization/buguid?organizationId=${orgid}`)
  }
}

class RequestCity extends ApiSuper {
 
  @methods('get')
  getAll(city:string) {
    return this.request<ICityResponse[]>(`city/all?search=${city}`)
  }
}

export const requestCity = new RequestCity()
export const requestCityAjax = new RequestCityAjax()