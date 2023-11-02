import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { BasketModel } from "../domain/basket.model";
import { IProduct } from "modules/ShopModule/interfaces/shop.type";
import { IbodyReqCart } from "../interfaces/basket.type";
import { UserModel } from "modules/UserModule/domain/user.model";

export class BasketUseCase {
	

	constructor(
		public readonly basketModel: BasketModel,
		public readonly organizationModel: OrganizationModel,
		public readonly organizationStatusModel: OrganizationStatusModel,
		public readonly userModel:UserModel
	) {
	}

	basketBody() {
		const user = this.userModel.guestUser && this.userModel.guestUser.id
		if (this.organizationModel.selectOrganization) {
			return {
				orderType: this.organizationStatusModel.selectDeliveryTipe?.metod || "",
				organization: this.organizationModel.selectOrganization?.guid,
				userid:user
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
		if(cartId){
			this.cartCase(async (bodyReqCart:IbodyReqCart)=>{
				this.basketModel.actionCheckbasketError(null)
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
		const user = this.userModel.guestUser && this.userModel.guestUser.id
		console.log('deliteCart',user);
		this.cartCase(async (bodyReqCart:IbodyReqCart)=>{
			user && await this.basketModel.repositoryDeliteCart({userid:user})
		})
	}

	async resetCart(){
		const user = this.userModel.guestUser && this.userModel.guestUser.id
		user && await this.basketModel.repositoryDeliteCart({userid:user})
		this.basketModel.actionCheckbasketError(null)
	}

	async checkCartHI(){
		const user = this.userModel.guestUser && this.userModel.guestUser.id
		user && await this.basketModel.repositoryCheckCart({userid:user})
	}
}