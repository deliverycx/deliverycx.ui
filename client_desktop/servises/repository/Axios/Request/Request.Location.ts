import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  Favorites = {
    isFav: boolean
    product:string
  }
}
namespace Res{
  export type Favorites = {
    productId:string
  }
}



class RequestLocation extends ApiSuper {
 
  @methods('get')
  getAll(city:string) {
    return this.request(`city/all?search=${city}`)
  }
}
export default new RequestLocation()