/* eslint-disable @typescript-eslint/no-namespace */
import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  Favorites = []
}
namespace Res{
  export type Favorites = {
    productId:string
  }
}



class RequestShop extends ApiSuper {
 
  @methods('put')
  addFavorites(productId:any) {
    return this.request<any>(`/favorite/click`)
  }

	@methods('get')
  getFavorites() {
    return this.request<Req.Favorites>(`/product/favorites`)
  }
}
export default new RequestShop()