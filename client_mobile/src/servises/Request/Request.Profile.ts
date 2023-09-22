import { ApiSuper, methods } from "servises/Axios/AxiosApi";


type IDatReg = {
    isNew: boolean;
    access?: string;
};
interface IUpdateData {
    name?: string;
    phone?: string;
    address?: {
        home: number;
        street: string;
    };
    organizationId?: string;
}

class RequestProfile extends ApiSuper {
    @methods("post")
    register() {
        return this.request<IDatReg>("/user/create");
    }
    @methods("patch")
    update(data: IUpdateData) {
        return this.request("/user/update");
    }
}
export default new RequestProfile();
