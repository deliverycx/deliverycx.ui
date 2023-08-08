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

	@methods('get')
  getOraganizationCount(org:string) {
    return this.request<{_id:string,coutn:number,date:string}>(`/counterhinkal/getcount?organization=${org}`)
  }
	@methods('post')
  setOraganizationCount(data:any) {
    return this.request<any>(`/counterhinkal/setcount`)
  }
}
export default new RequestAdmin()