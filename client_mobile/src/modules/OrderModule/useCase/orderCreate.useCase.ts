import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { OrderModel } from "../domain/order.model";
import { OrderCreateBodyEntity, OrderCreateEntity } from "../domain/orderCreate.entity";
import { BasketModel } from "modules/BasketModule/domain/basket.model";
import { orderCreateRepository } from "../data/orderCreate.repository";
import { OrderCreateModel } from "../domain/orderCreate.model";
import { DELIVERY_METODS, PAYMENT_METODS } from "application/contstans/const.orgstatus";
import { UserModel } from "modules/UserModule/domain/user.model";

export class OrderCreateUseCase {
	protected createOrderBody: OrderCreateBodyEntity

	constructor(
		public orderCreateModel: OrderCreateModel,
		private readonly orderModel: OrderModel,
		private readonly organizationModel: OrganizationModel,
		private readonly organizationStatusModel: OrganizationStatusModel,
		private readonly basketModel: BasketModel,
		private userModel: UserModel
	) {
		this.createOrderBody = new OrderCreateBodyEntity()
	}

	protected createOrderFabric(hash?: string) {

		if (this.orderModel.orderDeliveryAddress) {
			this.createOrderBody.prepareAddress(this.orderModel.orderDeliveryAddress)
		}
		if (this.orderModel.orderBody) {
			this.createOrderBody.bodyOrder(this.orderModel.orderBody)
		}
		if (this.organizationModel.selectOrganization && this.userModel.guestUser) {
			this.createOrderBody.defaultBody(hash, this.organizationModel.selectOrganization, this.userModel.guestUser.id)
		}
		if (
			this.organizationStatusModel.selectDeliveryTipe &&
			this.basketModel.basketPrice
		) {
			this.createOrderBody.metodsOrder(
				this.organizationStatusModel.selectDeliveryTipe,
				this.basketModel.basketPrice
			)
		}
		if (
			this.orderModel.orderOnspotTable &&
			(this.organizationStatusModel.selectDeliveryTipe && this.organizationStatusModel.selectDeliveryTipe.metod === DELIVERY_METODS.ONSPOT)
		) {
			this.createOrderBody.orderTable(this.orderModel.orderOnspotTable)
		}

		return this.createOrderBody.orderStates
	}

	async orderCheck() {
		const body = this.createOrderFabric()
		const url = await orderCreateRepository.repositoryCheckOrder(body)
		return url
	}

	async orderCreate(hash: string) {

		const resultOrder = await orderCreateRepository.repositoryOrderHasRedis(hash)
		if (!resultOrder) {
			const body = this.createOrderFabric(hash)
			await this.orderCreateMetod(body)
			return null
		} else {
			return resultOrder && resultOrder.orderNumber
			//this.orderCreateModel.actionSetOrderNumber(orderNumber)
		}
	}

	async orderCreateMetod(body: any) {
		if (this.orderModel.orderBody.payment === PAYMENT_METODS.CARD) {
			const pay = await this.orderCreateModel.repositoryCreateOrder(body, true)
			if (pay && pay.redirectUrl) {
				if (typeof pay.redirectUrl === 'string') {
					window.location.href = pay.redirectUrl;
				}

			}
		} else {
			await this.orderCreateModel.repositoryCreateOrder(body)
		}
	}
}