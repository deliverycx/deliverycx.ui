import { ApiAdminSuper, ApiSuper, methods } from "../AxiosApi"



class RequestAdmin extends ApiAdminSuper {
 
  @methods('get')
  bannersList(org:string) {
    return this.request(`/display/all?organization=${org}`)
  }

	@methods('post')
  getBu(idorg:{idorganization: string}) {
    return this.request<any>(`/organization/getorgbu`)
  }
	@methods('get')
  getVip() {
    return this.request<any>(`/dashbord/bu`)
  }
}
export default new RequestAdmin()