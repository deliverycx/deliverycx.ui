import { ApiSuper, methods } from 'shared/api/Axios/AxiosApi';
import { AjaxApiSuper } from 'shared/api/rxjs/AjaxApi';
import { IPointStatusRequest } from '../../interfaces/types/organizationStatus.type';
import { InjectableDI } from 'application/helpers/dependencyInjection';


@InjectableDI()
export class RequestOrganizationStatusAPI extends ApiSuper {
	@methods('get')
	getPointStatus(pointid: string) {
		return this.request<IPointStatusRequest>(
			`organization/organizationstatus?organization=${pointid}`,
		);
	}
}

export const requestOrganizationStatusAPI = new RequestOrganizationStatusAPI();
