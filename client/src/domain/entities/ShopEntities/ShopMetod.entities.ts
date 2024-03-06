import { IShopEntities } from "./Shop.entities"

export interface IShopEntitiesMetod{
  setCategories(state:IShopEntities,action:any):void
}
/**
 * @method setCategories добавление выбранной категории
 * @method setsetStopList добавление стоп листов
 */
export class ShopEntitiesMetod{
  public static setCategories(state:IShopEntities,action:any) {
    state.category = action.payload
  }
	public static setProductCard(state:IShopEntities,action:any) {
    state.productCard = action.payload
  }
	public static setFavorites(state:IShopEntities,action:any) {
		state.favorites = action.payload
    
  }
  public static setStopList(state:IShopEntities,action:any) {
    state.stoplist = action.payload
  }
	public static setRefreshShop(state:any) {
    state.favorites = []
		state.productCard = null
		state.category = null
		state.stoplist = null
  }
}