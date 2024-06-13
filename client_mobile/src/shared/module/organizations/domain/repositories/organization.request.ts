import { ICityResponse } from 'modules/CityModule/interfaces/city.type';
import { ApiAdminSuper, ApiSuper, methods } from 'shared/api/Axios/AxiosApi';
import { AjaxApiSuper } from 'shared/api/rxjs/AjaxApi';
import {
	IOrganization,
	IOrganizationResponse,
	OrganizationFilters,
	OrganizationGoodPlaceID,
} from '../../interfaces/types/organization.type';
import { InjectableDI } from 'application/helpers/dependencyInjection';


@InjectableDI()
export class RequestOrganizationApi extends ApiSuper {
	@methods('get')
	getAll(cityId: string) {
		return this.request<IOrganizationResponse[]>(
			`organization/all?cityId=${cityId}`,
		);
	}

	@methods('post')
	pointSerch(body: any) {
		return this.request<IOrganizationResponse[]>(`organization/serch`);
	}

	@methods('get')
	getRequisites(cityId: string) {
		return this.request<any>(
			`organization/recvisites?organizationId=${cityId}`,
		);
	}
	@methods('post')
	filterPoint(data: any) {
		return this.request<IOrganizationResponse[]>(`organization/filter`);
	}
}

class RequestOrganizationAdmin extends ApiAdminSuper {
	@methods('get')
	getFilters() {
		return this.request<OrganizationFilters[]>(`/organizationfilter/all?id=''`);
	}

	@methods('get')
	getByOrganizationGoodPlaceId(organizationId: string | any) {
		return this.request<OrganizationGoodPlaceID>(
			`/organization_goodplace/buorg?organization=${organizationId}`,
		);
	}

	@methods('get')
	socialBu(query: any) {
		return this.request<{ social: any; like: string }>(
			`/organization/socialbu?idorganization=${query}`,
		);
	}
}
export const requestOrganizationAdmin = new RequestOrganizationAdmin();
export const requestOrganizationApi = new RequestOrganizationApi();
