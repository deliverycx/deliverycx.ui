import { ApiAdminSuper, ApiSuper, methods } from "../AxiosApi"



class RequestAdmin extends ApiAdminSuper {
 
  @methods('get')
  bannersList(org:string) {
    return this.request(`/mainbanner/all?organization=${org}`)
  }
}
export default new RequestAdmin()