import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "../domain/organizationStatus.model";
import { IDeliveryTypes } from "../interfaces/organizationStatus.type";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";

export class UseCaseOrganizationStatus {
	constructor(
		private readonly organizationModel: OrganizationModel,
		private readonly organizationStatusModel: OrganizationStatusModel
	) { }

	selectDeliveryMetod(deliveryTipe: IDeliveryTypes | null) {
		this.organizationStatusModel.actionSelectDeliveryTipe(deliveryTipe)
	}

	statusOrganization() {
		if (this.organizationModel.selectOrganization) {
			return this.organizationStatusModel.actionOrganizationStatus(this.organizationModel.selectOrganization)
		}
	}

	checkDeliveryMetod() {
		if (this.organizationStatusModel.selectDeliveryTipe) {
			this.organizationStatusModel.actionCheckDeliveryTipe(this.organizationStatusModel.selectDeliveryTipe)
		}

	}

	findDeliveryType(deliveryMetod: string,point:IOrganization) {
		
		const pointstatus = this.organizationStatusModel.actionOrganizationStatus(point)
		pointstatus && pointstatus.subscribe(data => {
			const delivery = this.organizationStatusModel.deliveryTypesMetod(data.deliveryMetod)
			delivery.forEach((metod) => {
				metod.metod === deliveryMetod && this.organizationStatusModel.actionSelectDeliveryTipe(metod)
			})
		})
	}


	targetOrganization(guid: string, deliveryMetod: any) {
		const point = this.organizationModel.actionSelectOrganization(guid)
		if (point) {
			point.subscribe((data: any) => {
				this.findDeliveryType(deliveryMetod,data)
			})
		}
		return point

	}
}