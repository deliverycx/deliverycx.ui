import { ICityResponse } from 'modules/CityModule/interfaces/city.type';
import { ApiSuper, methods } from 'shared/api/Axios/AxiosApi';
import { AjaxApiSuper } from 'shared/api/rxjs/AjaxApi';
import { IPointStatusRequest } from '../interfaces/organizationStatus.type';

class RequestOrganizationStatus extends AjaxApiSuper {
	@methods('get')
	getPointStatus(pointid: string) {
		return this.request<IPointStatusRequest>(
			`organization/organizationstatus?organization=${pointid}`,
		);
	}
}

class RequestOrganizationStatusAPI extends ApiSuper {
	@methods('get')
	getPointStatus(pointid: string) {
		return this.request<IPointStatusRequest>(
			`organization/organizationstatus?organization=${pointid}`,
		);
	}
}

export const requestOrganizationStatusAPI = new RequestOrganizationStatusAPI();
export const requestOrganizationStatus = new RequestOrganizationStatus();
