import { makeObservable, observable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { ICity } from "modules/CityModule/interfaces/city.type";
import { OrganizationRepository } from "../data/organization.repository";
import { IOrganization } from "../interfaces/organization.type";

export class OrganizationModel extends OrganizationRepository {
	organizationList: Array<IOrganization> | null = []
	selectOrganization:IOrganization | null = null

	constructor() {
		super()
		makeObservable(this, {
			organizationList: observable,
			selectOrganization: observable,
			actionSetOrganizationAll: action,
			actionResetOrganizationAll:action
		})
	
	}

	
	async actionSetOrganizationAll(cityid: string) {
		return this.getAllOrganization(cityid).then((data: any) => {
			this.organizationList = data
			return data
		})
	}

	actionResetOrganizationAll(){
		this.organizationList = null
	}



}