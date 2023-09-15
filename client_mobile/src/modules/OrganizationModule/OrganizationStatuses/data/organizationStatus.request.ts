import { ICityResponse } from "modules/CityModule/interfaces/city.type"
import { ApiSuper, methods } from "servises/Axios/AxiosApi"
import { AjaxApiSuper } from "servises/rxjs/AjaxApi"
import { IPointStatusRequest } from "../interfaces/organizationStatus.type"

class RequestOrganizationStatus extends AjaxApiSuper {
 
  @methods('get')
  getPointStatus(pointid:string) {
    return this.request<IPointStatusRequest>(`organization/organizationstatus?organization=${pointid}`)
  }
}

export const requestOrganizationStatus = new RequestOrganizationStatus()