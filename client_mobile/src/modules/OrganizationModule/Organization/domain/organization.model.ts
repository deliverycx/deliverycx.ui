import { makeObservable, observable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { ICity } from "modules/CityModule/interfaces/city.type";
import { OrganizationRepository } from "../data/organization.repository";
import { IOrganization, pointSerch } from "../interfaces/organization.type";

interface IRequisites {
	ogrn: string
	inn: string
	name: string
}

export class OrganizationModel extends OrganizationRepository {
	organizationList: Array<IOrganization> | null = []
	selectOrganization:IOrganization | null = null
	selectRequisites:IRequisites | null = null

	constructor() {
		super()
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

	
	actionSetOrganizationAll(cityid: string) {
		return this.repositoryAllOrganization(cityid)
			.subscribe((data: any) => {
				this.organizationList = data
			})
	}

	actionFilterOrganization(filter:string[],cityid:string){
		return this.repositoryFilterOrganization(filter,cityid)
			.subscribe((data: any) => {
				if(data.length !== 0){
					this.organizationList = data
				}else{
					this.actionSetOrganizationAll(cityid)
				}
				
			})
	}

	actionSelectOrganization(point: IOrganization | null) {
		if(point){
			this.repositoryOrganization(point.guid)
			.subscribe((data: any) => {
				this.selectOrganization = data
				
			})
			
		}else{
			this.selectOrganization = null
		}
	}


	actionSerchOrganizations(valueSerch:pointSerch){
		this.repositoryOrganizationSerch(valueSerch)
			.subscribe((data: any) => {
				this.organizationList = data
			})
	}

	actionResetOrganizationAll(){
		this.organizationList = null
		this.selectRequisites = null
	}



}