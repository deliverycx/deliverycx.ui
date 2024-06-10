import { ApiAdminSuper, methods } from 'shared/api/Axios/AxiosApi';

class RequestAdmins extends ApiAdminSuper {
	@methods('get')
	getOraganizationCount(orgid: string) {
		return this.request<any>(`/counterhinkal/buorg?organization=${orgid}`);
	}

	@methods('post')
	setOraganizationCount(body: any) {
		return this.request(`/counterhinkal/setcount`);
	}
}
export default new RequestAdmins();
