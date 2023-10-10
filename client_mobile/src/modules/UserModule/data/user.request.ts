import { ApiSuper, methods } from "servises/Axios/AxiosApi";
import * as userType from "../interfaces/user.type";

class RequestUser extends ApiSuper {
	@methods("post")
	register() {
		return this.request<userType.IUserGuest>("/user/create");
	}
	@methods("post")
	check(body:userType.IUserGuest) {
		return this.request<userType.IUserGuest>("/user/check_guest");
	}
	@methods("patch")
	update(data: userType.IUpdateData) {
		return this.request("/user/update");
	}
}
export const requestUser = new RequestUser()
