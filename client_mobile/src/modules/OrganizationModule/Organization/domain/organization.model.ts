import { makeObservable, observable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { ICity } from "modules/CityModule/interfaces/city.type";
import { OrganizationRepository } from "../data/organization.repository";
import { IOrganization, pointSerch } from "../interfaces/organization.type";
import { IOrganizationStatus } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";

interface IRequisites {
	ogrn: string
	inn: string
	name: string
}

export class OrganizationModel{
	organizationList: Array<IOrganization> | null = []
	selectOrganization:IOrganization | null = null
	selectRequisites:IRequisites | null = null

	constructor() {
		
		makeObservable(this, {
			organizationList: observable,
			selectOrganization: observable,
			selectRequisites: observable,
			actionSetOrganizationAll: action,
			actionResetOrganizationAll:action,
			actionSelectOrganization:action
		})
		makePersistable(this, { name: 'PointStore', properties: ['selectOrganization'],storage: window.localStorage });
	}

	
	actionSetOrganizationAll(list:IOrganization[]) {
		this.organizationList = list
	}


	actionSelectOrganization(organization: IOrganization | null) {
		this.selectOrganization = organization
	}


	actionSerchOrganizations(valueSerch:pointSerch){
		console.log('serch');
	}

	actionResetOrganizationAll(){
		this.organizationList = null
		this.selectRequisites = null
	}



}