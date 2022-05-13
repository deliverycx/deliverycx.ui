import { IReverveTable } from "@types"
import { ApiSuper, methods } from "../AxiosApi"



class RequestWebhook extends ApiSuper {
 
  @methods('post')
  reverveTable(reservebody:IReverveTable) {
    return this.request(`/webhook/revervetable`)
  }
}
export default new RequestWebhook()