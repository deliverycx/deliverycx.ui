import { OrganizationModel } from 'modules/OrganizationModule/Organization/domain/organization.model';
import { OrganizationStatusModel } from 'modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model';
import { BasketModel } from '../domain/basket.model';
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import {
	IbodyReqCart,
	ICartAdditonalSous,
	ICartProd,
} from '../interfaces/basket.type';
import { UserModel } from 'modules/UserModule/domain/user.model';

export class BasketUseCase {
	constructor(
		public readonly basketModel: BasketModel,
		public readonly organizationModel: OrganizationModel,
		public readonly organizationStatusModel: OrganizationStatusModel,
		public readonly userModel: UserModel,
	) { }

	basketBody() {
		const user = this.userModel.guestUser && this.userModel.guestUser.id;
		if (this.organizationModel.selectOrganization) {
			return {
				orderType: this.organizationStatusModel.selectDeliveryTipe?.metod || '',
				organization: this.organizationModel.selectOrganization?.guid,
				userid: user,
			};
		} else {
			return null;
		}
	}

	async getBasket(body: { orderType: string; organization: string }) {
		return body && (await this.basketModel.actionGetBasket(body));
	}

	findIdCart(id: string) {
		if (this.basketModel.cart) {
			const cartid = this.basketModel.findIndexCart(id, this.basketModel.cart);
			return cartid;
		}
	}

	async cartCase(fn?: any) {
		const body = this.basketBody();
		if (body) {
			fn && (await fn(body));
			const res = await this.getBasket(body);
			return res && res.cart;
		}
	}

	async addtoCart(product: IProduct, anmount = 1) {
		this.cartCase(async (bodyReqCart: IbodyReqCart) => {
			await this.basketModel.repositoryAddToCart({
				product,
				anmount,
				...bodyReqCart,
			});
		});
	}

	async changeAmountCart(id: string, coutn: number) {
		if (coutn > 500) {
			return
		}
		const cartId = this.findIdCart(id);
		if (cartId) {
			this.cartCase(async (bodyReqCart: IbodyReqCart) => {

				this.basketModel.actionCheckbasketError(null);

				if (coutn !== 0) {
					await this.basketModel.repositoryChangeAmountCart({
						amount: coutn,
						cartId: cartId.id,
						...bodyReqCart,
					});
				} else {
					await this.removeOneCart(cartId.id);
				}
			});

			//this.checkSousCart(cartId)
		}
	}

	async removeOneCart(idcart: string) {
		this.cartCase(async (bodyReqCart: IbodyReqCart) => {
			await this.basketModel.repositoryRemoveOneCart({
				cartId: idcart,
				...bodyReqCart,
			});
		});
	}

	async deliteCart() {
		const user = this.userModel.guestUser && this.userModel.guestUser.id;

		this.cartCase(async (bodyReqCart: IbodyReqCart) => {
			user && (await this.basketModel.repositoryDeliteCart({ userid: user }));
		});
	}

	async resetCart() {
		const user = this.userModel.guestUser && this.userModel.guestUser.id;
		user && (await this.basketModel.repositoryDeliteCart({ userid: user }));
		this.basketModel.actionCheckbasketError(null);
	}

	async checkCartHI() {
		const user = this.userModel.guestUser && this.userModel.guestUser.id;
		user && (await this.basketModel.repositoryCheckCart({ userid: user }));
	}

	findSousCart(product: string, parent: string) {
		const findProd = this.basketModel.cartAddional.find(
			(item) => item.sousid === product && item.parentid === parent,
		);
		return findProd;
	}

	checkSousCart(product: any) {
		const findSous = this.basketModel.cartAddional.find(
			(item) => item.sousid === product.productId,
		);
		if (findSous) {
			const countSous = this.basketModel.cartAddional.reduce((acc, value) => {
				if (findSous.sousid === value.sousid) {
					return (acc += value.count);
				}
				return acc;
			}, 0);
			if (countSous > Number(product.anmout) - 1) {

			}

		}
	}

	changeSousCart(sosus: ICartAdditonalSous, count: number, parent: string) {
		const cartid = this.findIdCart(sosus.sousid);
		if (sosus && cartid) {
			this.basketModel.cartAddionalSousChange(sosus.sousid, parent, count);
			const countSous = this.basketModel.cartAddional.reduce((acc, value) => {
				if (sosus.sousid === value.sousid) {
					return (acc += value.count);
				}
				return acc;
			}, 0);
			this.changeAmountCart(sosus.sousid, countSous);
		}
	}
	addtionalSousCart(product: IProduct, parent: string) {
		const cartid = this.findIdCart(product.productId);
		const sousParent = this.findSousCart(product.productId, parent);

		if (cartid && sousParent) {
			if (sousParent.parentid === parent) {
				this.changeAmountCart(
					product.productId,
					cartid.anmout - sousParent.count,
				);
			}

			this.basketModel.cartAddionalDeleteSous(product.productId, parent);
		} else {
			this.addtoCart(product);
			this.basketModel.cartAddionalSous({
				sousid: product.productId,
				parentid: parent,
				count: 1,
				amount: product.price,
			});
		}
	}
}
