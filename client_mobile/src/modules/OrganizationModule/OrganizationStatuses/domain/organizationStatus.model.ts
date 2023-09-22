import { action, makeObservable, observable } from "mobx"
import { OrganizationStatusRepository } from "../data/organizationStatus.repository"
import { IDeliveryTypes, IPointStatus, IWorkTimePoint } from "../interfaces/organizationStatus.type"
import { makePersistable } from "mobx-persist-store"
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type"

export class OrganizationStatusModel extends OrganizationStatusRepository{
	deliveryTipe:IDeliveryTypes[] | null = null
	organizationStatus:string | null = null
	timeworkOrganization:IWorkTimePoint | null = null
	selectDeliveryTipe:IDeliveryTypes | null = null
	
	constructor() {
		super()
		makeObservable(this, {
			deliveryTipe: observable,
			organizationStatus: observable,
			selectDeliveryTipe: observable,
			timeworkOrganization: observable,
			actionOrganizationStatus:action,
			actionSelectDeliveryTipe:action
		})
		makePersistable(this, { name: 'selectDeliveryTipe', properties: ['selectDeliveryTipe'],storage: window.localStorage });
	}

	actionOrganizationStatus(point:IOrganization | null){
		if(point){
			this.getOrganizationStatus(point.guid)
			.subscribe((data: IPointStatus) => {
				this.deliveryTipe = this.deliveryTypesMetod(data.deliveryMetod)
				this.organizationStatus = data.organizationStatus
				this.timeworkOrganization = this.timeWorkOrganizationEntiti(point.workTime)
			})
		}else{
			this.deliveryTipe = null
		}
		
	}

	actionSelectDeliveryTipe(deliveryTipe:IDeliveryTypes){
		this.selectDeliveryTipe = deliveryTipe
	}

}