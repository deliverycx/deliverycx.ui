import { ApiSuper, methods } from "../AxiosApi";

namespace Req{
    export type SubscribeReq = {
        to: string;
    }
}

class SubscribeRequest extends ApiSuper {
    @methods("post")
    subscribe(to: Req.SubscribeReq) {
        return this.request<Req.SubscribeReq>("/webhook/subscription");
    }
}

export default new SubscribeRequest();
