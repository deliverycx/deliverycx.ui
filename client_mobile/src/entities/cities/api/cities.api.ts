/* eslint-disable @typescript-eslint/no-namespace */
import { InjectableDI } from 'application/helpers/dependencyInjection';
import { ApiSuper, methods } from 'shared/api/Axios/AxiosApi';

export type IGetAllCitys = {
	id: string;
	name: string;
	isHidden: boolean;
	countOrg: number;
};

@InjectableDI()
export class CitiesApi extends ApiSuper {
	@methods('get')
	getAll(city: string) {
		return this.request<IGetAllCitys[]>(`city/all?search=${city}`);
	}
}
