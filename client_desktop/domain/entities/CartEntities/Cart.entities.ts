import { ICart } from "@types"
import Entities from "../Entities"

export type ICartEntities = ICart
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class CartEntities extends Entities<ICartEntities>{
  protected totalPrice = 0
  protected address = ''
  protected orderError = {}
  protected orderNumber = null
  protected deltaPrice = 0
  protected loadingOrder = false
	protected loadingDiscount = false
  protected orderType = "COURIER"
  constructor() {
    super()
    this.entities = {
      totalPrice: this.totalPrice,
      address: this.address,
      orderError: this.orderError,
      orderNumber: this.orderNumber,
      deltaPrice: this.deltaPrice,
      loadingOrder: this.loadingOrder,
			loadingDiscount:this.loadingDiscount,
      orderType: this.orderType
    }
  }

}
export default CartEntities.getInstance(CartEntities)