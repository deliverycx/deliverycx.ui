import { ApiAdminSuper, methods } from 'servises/Axios/AxiosApi';

class RequestAdmins extends ApiAdminSuper {
	@methods('get')
	getOraganizationCount(orgid: string) {
		return this.request<any>(`/counterhinkal/buorg?organization=${orgid}`);
	}

	@methods('get')
	offsite() {
		return this.request<any>(`/dashbord/bu`);
	}

	@methods('post')
	setOraganizationCount(body: any) {
		return this.request(`/counterhinkal/setcount`);
	}
}
export default new RequestAdmins();
