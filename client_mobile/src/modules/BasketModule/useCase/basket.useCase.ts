import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { BasketModel } from "../domain/basket.model";
import { IProduct } from "modules/ShopModule/interfaces/shop.type";
import { IbodyReqCart } from "../interfaces/basket.type";

export class BasketUseCase {
	

	constructor(
		public readonly basketModel: BasketModel,
		public readonly organizationModel: OrganizationModel,
		public readonly organizationStatusModel: OrganizationStatusModel,
	) {
	}

	basketBody() {
		if (this.organizationStatusModel.selectDeliveryTipe && this.organizationModel.selectOrganization) {
			return {
				orderType: this.organizationStatusModel.selectDeliveryTipe.metod,
				organization: this.organizationModel.selectOrganization?.guid,
			}
		} else {
			return null
		}

	}

	async getBasket(body: { orderType: string, organization: string }) {
		return body && await this.basketModel.actionGetBasket(body)
	}

	findIdCart(id:string){
		if (this.basketModel.cart) {
			const cartid = this.basketModel.findIndexCart(id, this.basketModel.cart)
			return cartid
		}
	}

	async cartCase(fn?:any){
		const body = this.basketBody()
		if (body) {
			fn && await fn(body)
			const res = await this.getBasket(body)
			return res && res.cart
		}
	}

	async addtoCart(product: IProduct, anmount = 1) {
		this.cartCase(async (bodyReqCart:IbodyReqCart)=>{
			await this.basketModel.repositoryAddToCart({
			product,
			anmount,
			...bodyReqCart
			})
		})
	}

	async changeAmountCart(id: string, coutn: number) {
		const cartId = this.findIdCart(id)
		console.log(id);
		if(cartId){
			this.cartCase(async (bodyReqCart:IbodyReqCart)=>{
				await this.basketModel.repositoryChangeAmountCart({
						amount:coutn,
						cartId:cartId.id,
					...bodyReqCart
				})
			})
		}

	}

	async removeOneCart(idcart:string){
		this.cartCase(async (bodyReqCart:IbodyReqCart)=>{
			await this.basketModel.repositoryRemoveOneCart({
					cartId:idcart,
				...bodyReqCart
			})
		})
	}

	async deliteCart(){
		this.cartCase(async (bodyReqCart:IbodyReqCart)=>{
			await this.basketModel.repositoryDeliteCart()
		})
	}
}