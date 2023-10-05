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
	paymentMetod:string[] | null = null
	
	constructor() {
		super()
		makeObservable(this, {
			deliveryTipe: observable,
			organizationStatus: observable,
			selectDeliveryTipe: observable,
			timeworkOrganization: observable,
			actionOrganizationStatus:action,
			actionSelectDeliveryTipe:action,
			actionCheckDeliveryTipe:action
		})
		makePersistable(this, { name: 'selectDeliveryTipe', properties: ['selectDeliveryTipe'],storage: window.localStorage });
	}

	actionOrganizationStatus(point:IOrganization | null){
		if(point){
			const observableStatus = this.getOrganizationStatus(point.guid)
			observableStatus.subscribe((data: IPointStatus) => {
				const time = this.timeWorkOrganizationEntiti(point.workTime)
				const deliverytypes = this.deliveryTypesMetod(data.deliveryMetod)
				this.deliveryTipe =  this.changesDeliveryType(deliverytypes,time,this.selectDeliveryTipe)
				this.organizationStatus = data.organizationStatus
				this.timeworkOrganization = time
				this.paymentMetod = data.paymentMetod
			})
			return observableStatus
		}else{
			this.deliveryTipe = null
		}
		
	}

	actionSelectDeliveryTipe(deliveryTipe:IDeliveryTypes | null){
		this.selectDeliveryTipe = deliveryTipe
	}

	actionCheckDeliveryTipe(deliveryTipe:IDeliveryTypes){
		if(this.deliveryTipe && this.timeworkOrganization){
			this.deliveryTipe = this.changesDeliveryType(this.deliveryTipe,this.timeworkOrganization,deliveryTipe)

		}
	}

	

}