import { ICityResponse } from "modules/CityModule/interfaces/city.type"
import { ApiSuper, methods } from "servises/Axios/AxiosApi"

class RequestOrganizationStatus extends ApiSuper {
 
  @methods('get')
  getAll(cityId:string) {
    return this.request<ICityResponse[]>(`organization/all?cityId=${cityId}`)
  }
}

export const requestOrganization = new RequestOrganizationStatus()