import { IReverveTable, ISocial } from "@types"
import { ApiAdminSuper, ApiSuper, methods } from "../AxiosApi"



class RequestAdmin extends ApiAdminSuper {
 
  @methods('get')
  bannersList(org:string) {
    return this.request(`/display/all?organization=${org}`)
  }
	@methods('get')
  social(query:string) {
    return this.request<ISocial>(`/organization/socialbu?idorganization=${query}`)
  }
	@methods('post')
  getBu(idorg:{idorganization: string}) {
    return this.request<any>(`/organization/getorgbu`)
  }
}
export default new RequestAdmin()