import { IProduct } from "modules/ShopModule/interfaces/shop.type"
import * as basketType from "./basket.type"
import { IsArray, IsNotEmpty } from "class-validator"
import { ICartProd, IRequestBasket } from "./basket.type"
import { mappersDTO } from "application/helpers/mappersDTO"
import { validatorDTO } from "application/helpers/validatorDTO"


export class BasketDTO {

	@IsArray()
	cart!: ICartProd[]

	@IsNotEmpty()
	basketPrice!: basketType.IBasketPrice
}

export const basketDTO = new BasketDTO()

export const basketMapper = (p: IRequestBasket): BasketDTO => {
	basketDTO.cart = p.cart
	basketDTO.basketPrice = {
		deliveryPrice: p.deliveryPrice,
		deltaPrice: p.deltaPrice,
		totalPrice: p.totalPrice,
		fullPrice:p.fullPrice
	}


	validatorDTO(basketDTO)
	return { ...basketDTO }

}