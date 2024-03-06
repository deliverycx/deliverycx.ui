/* eslint-disable @typescript-eslint/no-namespace */
import * as Types from "@types";
import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
    export type  stoplist = {
        organizationId: string;
    }
}
namespace Res{
    export type stoplist = {
        productId:string
    }
    export type getstreet = {
        organizationId:string
        cityId:string
    }
}



class RequestWebhook extends ApiSuper {

    @methods('get')
    stoplist(org:string) {
        return this.request(`/stoplist/getStopList/?organizationId=${org}`)
    }

    @methods('post')
    getStreetCity(body:Res.getstreet) {
        return this.request(`/webhook/getstreet`)
    }

    @methods('get')
    getStreetDaData(street:string) {
        return this.request(`/webhook/daData/${street}`)
    }
    @methods('post')
    reverveTable(reservebody:Types.IReverveTable) {
        return this.request(`/webhook/revervetable`)
    }
}
export default new RequestWebhook()