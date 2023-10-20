import { IUserGuest } from "modules/UserModule/interfaces/user.type";
import { ApiSuper, methods } from "servises/Axios/AxiosApi";

class RequestProfile extends ApiSuper {
	@methods("post")
	personal(body:any) {
		return this.request<IUserGuest>(`/profile/personal`);
	}

	@methods("get")
	getProfile(userid:any) {
		return this.request<IUserGuest>(`/profile/getprofile?userid=${userid}`);
	}

	@methods("post")
	deliveryAdress(body:any) {
		return this.request<IUserGuest>(`/profile/adressdelivery`);
	}
	@methods("post")
	delDeliveryAdress(body:any) {
		return this.request<IUserGuest>(`/profile/deladressdelivery`);
	}
	
}
export const requestProfile = new RequestProfile()
