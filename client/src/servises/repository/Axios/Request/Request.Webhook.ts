/* eslint-disable @typescript-eslint/no-namespace */
import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  stoplist = {
    organizationId: string;
  }
}
namespace Res{
  export type stoplist = {
    productId:string
  }
}



class RequestWebhook extends ApiSuper {
 
  @methods('get')
  stoplist(org:string) {
    return this.request(`/stoplist/getStopList/?organizationId=${org}`)
  }
}
export default new RequestWebhook()