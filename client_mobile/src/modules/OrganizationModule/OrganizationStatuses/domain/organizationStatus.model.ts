import { action, makeObservable } from "mobx"
import { OrganizationStatusRepository } from "../data/organizationStatus.repository"
import { IDeliveryTypes, IPointStatus } from "../interfaces/organizationStatus.type"

export class OrganizationStatusModel extends OrganizationStatusRepository{
	deliveryTipe:IDeliveryTypes[] | null = null
	organizationStatus:string | null = null
	
	constructor() {
		super()
		makeObservable(this, {
			actionOrganizationStatus:action
		})
	
	}

	actionOrganizationStatus(pointid:string | null){
		if(pointid){
			this.getOrganizationStatus(pointid)
			.subscribe((data: IPointStatus) => {
				this.deliveryTipe = this.deliveryTypesMetod(data.deliveryMetod)
				this.organizationStatus = data.organizationStatus
			})
		}else{
			this.deliveryTipe = null
		}
		
	}

}