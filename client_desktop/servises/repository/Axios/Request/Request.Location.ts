import { ApiSuper, methods, token } from "../AxiosApi";
import { IPointStatus } from '@types';

namespace Req{
  export type  Favorites = {
    isFav: boolean
    product:string
  }
}
namespace Res{
  export type Favorites = {
    productId:string
  }
}



class RequestLocation extends ApiSuper {
 
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
	@methods('get')
  geStatusOrgAll(organization:string) {
    return this.request<IPointStatus>(`/organization/organizationstatus?organization=${organization}`)
  }
}
export default new RequestLocation()