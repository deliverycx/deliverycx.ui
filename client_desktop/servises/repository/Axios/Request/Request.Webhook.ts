import { IReverveTable } from "@types"
import { ApiSuper, methods } from "../AxiosApi"



class RequestWebhook extends ApiSuper {
 
  @methods('post')
  reverveTable(reservebody:IReverveTable) {
    return this.request(`/webhook/revervetable`)
  }

	@methods('get')
  stoplist(org:string) {
    return this.request(`/stoplist/getStopList/?organizationId=${org}`)
  }

	@methods('post')
  flip(body:any) {
    return this.request(`/webhook/flipcount`)
  }
}
export default new RequestWebhook()