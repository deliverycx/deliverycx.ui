import { ApiSuper, methods } from "servises/Axios/AxiosApi"





class RequestWebhook extends ApiSuper {
 
  @methods('get')
  stoplist(org:string) {
    return this.request(`/stoplist/getStopList/?organizationId=${org}`)
  }

	@methods('post')
  getStreetCity(body:any) {
    return this.request(`/webhook/getstreet`)
  }

	@methods('get')
  getStreetDaData(street:string) {
    return this.request(`/webhook/daData/${street}`)
  }
	@methods('post')
  reverveTable(reservebody:any) {
    return this.request(`/webhook/revervetable`)
  }
	@methods('post')
  flip(body:any) {
    return this.request(`/webhook/flipcount`)
  }
}
export default new RequestWebhook()