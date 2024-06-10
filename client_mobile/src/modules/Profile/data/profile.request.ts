import { IUserGuest } from 'modules/UserModule/interfaces/user.type';
import { ApiSuper, methods } from 'shared/api/Axios/AxiosApi';
import { IRequestOrderUser } from '../interfaces/profile.type';

class RequestProfile extends ApiSuper {
	@methods('post')
	personal(body: any) {
		return this.request<IUserGuest>(`/profile/personal`);
	}

	@methods('get')
	getProfile(userid: any) {
		return this.request<IUserGuest>(`/profile/getprofile?userid=${userid}`);
	}

	@methods('post')
	deliveryAdress(body: any) {
		return this.request<IUserGuest>(`/profile/adressdelivery`);
	}
	@methods('post')
	delDeliveryAdress(body: any) {
		return this.request<IUserGuest>(`/profile/deladressdelivery`);
	}
	@methods('get')
	ordersUser(userid: string) {
		return this.request<IRequestOrderUser[]>(`/order/orderuser/${userid}`);
	}

	@methods('get')
	getBumerang(phone: string) {
		return this.request<any>(`/profile/bumerang?phone=${phone}`);
	}
}
export const requestProfile = new RequestProfile();
