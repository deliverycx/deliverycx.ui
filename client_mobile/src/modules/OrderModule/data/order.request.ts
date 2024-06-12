import { ApiSuper, methods } from 'shared/api/Axios/AxiosApi';

class RequestOrder extends ApiSuper {
	@methods('get')
	orgTables(query: any) {
		return this.request<[]>(`/cart/organizationtables?id=${query}`);
	}
}

export const requestOrder = new RequestOrder();
