import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrderModel } from "../domain/order.model";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";
import { DELIVERY_METODS } from "application/contstans/const.orgstatus";
import { IOrderOnspotTable } from "../interfaces/order.type";

export class OrderUseCase{
	constructor(
		public readonly orderModel:OrderModel,
		public readonly organizationModel:OrganizationModel,
		public readonly organizationStatusModel:OrganizationStatusModel
		){}

	onSpotTable(){
		if(this.organizationModel.selectOrganization && this.organizationStatusModel.selectDeliveryTipe){
			const typeMetod = this.organizationStatusModel.selectDeliveryTipe.metod
				if(typeMetod === DELIVERY_METODS.ONSPOT){
					return this.orderModel.actionOrderOnspotTable(this.organizationModel.selectOrganization.guid)
				}else{
					this.orderModel.actionOrderOnspotTable(null)
					return null
				}
		}
		
	}
	setOnSpotTable(seletSpot:IOrderOnspotTable){
		this.orderModel.actionSetOrderOnspotTable(seletSpot)
	}
}