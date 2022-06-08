import { IReverveTable } from "@types"
import { ApiAdminSuper, ApiSuper, methods } from "../AxiosApi"



class RequestAdmin extends ApiAdminSuper {
 
  @methods('get')
  bannersList(org:string) {
    return this.request(`/mainbanner/buorg?organization=${org}`)
  }
}
export default new RequestAdmin()