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

  @methods('post')
  async getHiddenProducts(organization: {organization: string}) {
    return this.request<any>(`/organizationProduct/hiddenProducts`)
  }
	@methods('get')
	getOraganizationCount(orgid:string){
		return this.request<any>(`/counterhinkal/buorg?organization=${orgid}`)
	}
	@methods('post')
	setOraganizationCount(body:any){
		return this.request(`/counterhinkal/setcount`)
	}
}
export default new RequestAdmin()