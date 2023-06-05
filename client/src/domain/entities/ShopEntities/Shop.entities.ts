import { ICategory, ICity, IFavorites, IPoint, IProduct, IStopList, TStopListItems } from "@types"
import Entities from "../Entities"

export interface IShopEntities{
  isSearch: boolean
  category: ICategory
	products:IProduct[]
	productCard:IProduct
  favorites: IProduct[],
  stoplist:TStopListItems[]
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class ShopEntities extends Entities<IShopEntities>{
  protected isSearch = false
  protected category = null
	protected productCard = null
	protected products = null
  protected favorites = []
  protected stoplist = null
  constructor() {
    super()
    this.entities = {
      isSearch: this.isSearch,
      category: this.category,
			productCard:this.productCard,
			products:this.products,
      favorites: this.favorites,
      stoplist:this.stoplist
    }
  }

}
export default ShopEntities.getInstance(ShopEntities)