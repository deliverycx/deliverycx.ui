import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { BasketModel } from "../domain/basket.model";
import { IProduct } from "modules/ShopModule/interfaces/shop.type";

export class BasketUseCase {
	constructor(
		private readonly basketModel: BasketModel,
		private readonly organizationModel: OrganizationModel,
		private readonly organizationStatusModel: OrganizationStatusModel,
	) { }

	basketBody() {
		if (this.organizationStatusModel.selectDeliveryTipe && this.organizationModel.selectOrganization) {
			return {
				orderType: this.organizationStatusModel.selectDeliveryTipe?.metod,
				organization: this.organizationModel.selectOrganization?.guid,
			}
		} else {
			return null
		}

	}

	async getBasket(body: { orderType: string, organization: string }) {
		body && await this.basketModel.actionGetBasket(body)
	}

	async addtoBasket(product: IProduct) {
		const body = this.basketBody()
		if (body) {
			await this.basketModel.repositoryAddToCart({
				product,
				...body
			})
			await this.getBasket(body)
		}

	}

	async changeAmountBasket(id: string, coutn: number) {
		if (this.basketModel.cart) {
			const cartid = this.basketModel.findIndexBasket(id, this.basketModel.cart)
		}

	}
}