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

	@methods('get')
  flip(time:string) {
    return this.request(`/webhook/flipcount?time=${time}`)
  }
}
export default new RequestWebhook()