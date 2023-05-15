/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICart, IInitialValues, IOrderPrice } from "@types"
import { CartFormMetods } from "application/components/core/Cart/CartForm/CartMetods"
import Entities from "../Entities"

export type ICartEntities = ICart
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class CartEntities extends Entities<ICartEntities>{
	protected orderInfo = {
		address:'',
		kladrid:'',
		comment: "",
		flat: "",
		intercom: "",
		entrance: "",
		floor: "",
		name: "",
		phone: ""
	}
	protected orderPrice = {
		totalPrice: 0,
		deltaPrice: 0,
		deliveryPrice:	0
	}
  protected totalPrice = 0
  protected address = ''
	protected cordAddress = []
	protected kladrid = ''
  protected orderError = {}
  protected orderNumber = null
  protected loadingOrder = false
  protected orderType = "COURIER"
	protected orderTable = null
  constructor() {
    super()
    this.entities = {
      orderPrice: this.orderPrice,
      orderInfo:this.orderInfo,
      totalPrice: this.totalPrice,
      address: this.address,
			cordAddress:this.cordAddress,
			kladrid:this.kladrid,
      orderError: this.orderError,
      orderNumber: this.orderNumber,
      loadingOrder: this.loadingOrder,
      orderType: this.orderType,
			orderTable:this.orderTable
    }
  }

}
export default CartEntities.getInstance(CartEntities)