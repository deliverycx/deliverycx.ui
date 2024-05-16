import { action, makeObservable, observable } from "mobx"
import { OrganizationStatusRepository } from "../data/organizationStatus.repository"
import { IDeliveryTypes, IOrganizationStatus, IPointStatus, IWorkTimePoint } from "../interfaces/organizationStatus.type"
import { makePersistable } from "mobx-persist-store"
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type"
import { InjectableDI } from "application/helpers/dependencyInjection"

@InjectableDI()
export class OrganizationStatusModel{
	deliveryTipe:IDeliveryTypes[] | null = null
	organizationStatus:string | null = null
	timeworkOrganization:IWorkTimePoint | null = null
	selectDeliveryTipe:IDeliveryTypes | null = null
	paymentMetod:string[] | null = null
	organizationStatusMetods:IOrganizationStatus | null = null
	
	constructor() {

		makeObservable(this, {
			deliveryTipe: observable,
			organizationStatus: observable,
			selectDeliveryTipe: observable,
			timeworkOrganization: observable,
			organizationStatusMetods:observable,
			actionOrganizationStatus:action,
			actionSelectDeliveryTipe:action,
			actionCheckDeliveryTipe:action
		})
		makePersistable(this, { name: 'selectDeliveryTipe', properties: ['selectDeliveryTipe'],storage: window.localStorage });
	}

	actionOrganizationStatus(status:IOrganizationStatus){
		this.deliveryTipe = status.deliveryTipe
		this.organizationStatus = status.organizationStatus
		this.timeworkOrganization = status.timeworkOrganization
		this.paymentMetod = status.paymentMetod
		this.organizationStatusMetods = status
	}

	actionSelectDeliveryTipe(deliveryTipe:IDeliveryTypes | null){
		this.selectDeliveryTipe =  deliveryTipe ? {...deliveryTipe,active:true} : null
	}

	actionCheckDeliveryTipe(deliveryTipe:IDeliveryTypes){
		if(this.deliveryTipe && this.timeworkOrganization){
			//this.deliveryTipe = this.changesDeliveryType(this.deliveryTipe,this.timeworkOrganization,deliveryTipe)

		}
	}

	

}