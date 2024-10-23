import { ICityResponse } from 'modules/CityModule/interfaces/city.type';
import { ApiAdminSuper, ApiSuper, methods } from 'servises/Axios/AxiosApi';
import { AjaxApiSuper } from 'servises/rxjs/AjaxApi';
import type {
	IOrganization,
	IOrganizationResponse,
	IRequisitiesOrganization,
	OrganizationFilters,
	pointSerch,
} from '../interfaces/organization.type';
import { OrganizationGoodPlaceID } from '../interfaces/organization.type';

class RequestOrganization extends AjaxApiSuper {
	@methods('get')
	getAll(cityId: string) {
		return this.request<ICityResponse[]>(`organization/all?cityId=${cityId}`);
	}

	@methods('post')
	filterPoint(data: any) {
		return this.request(`organization/filter`);
	}

	@methods('post')
	pointSerch(body: pointSerch) {
		return this.request<IOrganization[]>(`organization/serch`);
	}

	@methods('get')
	getOrg(orgid: string) {
		return this.request<ICityResponse[]>(
			`organization/buguid?organizationId=${orgid}`,
		);
	}
}

class RequestOrganizationApi extends ApiSuper {
	@methods('get')
	getAll(cityId: string) {
		return this.request<IOrganizationResponse[]>(
			`organization/all?cityId=${cityId}`,
		);
	}
	@methods('get')
	geBuOrg(orgid: string) {
		return this.request<IOrganizationResponse>(`/organization/buguid?organizationId=${orgid}`)
	}

	@methods('post')
	pointSerch(body: any) {
		return this.request<IOrganizationResponse[]>(`organization/serch`);
	}

	@methods('get')
	getRequisites(pointid: string) {
		return this.request<any>(
			`organization/recvisites?organizationId=${pointid}`,
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
export const requestOrganization = new RequestOrganization();
