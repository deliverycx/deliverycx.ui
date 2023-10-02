import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "../domain/organizationStatus.model";
import { IDeliveryTypes } from "../interfaces/organizationStatus.type";

export class UseCaseOrganizationStatus{
	constructor(
		private readonly organizationModel:OrganizationModel,
		private readonly organizationStatusModel:OrganizationStatusModel
	){}

	selectDeliveryMetod(deliveryTipe:IDeliveryTypes){
		this.organizationStatusModel.actionSelectDeliveryTipe(deliveryTipe)
	}

	statusOrganization(){
		if(this.organizationModel.selectOrganization){
			return this.organizationStatusModel.actionOrganizationStatus(this.organizationModel.selectOrganization)
		}
	}

	checkDeliveryMetod(){
		if(this.organizationStatusModel.selectDeliveryTipe){
			this.organizationStatusModel.actionCheckDeliveryTipe(this.organizationStatusModel.selectDeliveryTipe)
		}
		
	}
}