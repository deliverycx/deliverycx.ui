import { CityModel } from "modules/CityModule/domain/city.model";
import { OrganizationModel } from "../domain/organization.model";
import { IOrganization } from "../interfaces/organization.type";
import { OrganizationStatusModel } from "modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model";


export class UseCaseOrganization{


	constructor(
		public readonly organizationModel:OrganizationModel,
		public readonly organizationStatusModel: OrganizationStatusModel,
		public readonly cityModel:CityModel
	){}
	
	organizationAll(){
		if(this.cityModel.selectCity && this.cityModel.selectCity.id){
			const cityid = this.cityModel.selectCity.id
			this.organizationModel.actionSetOrganizationAll(cityid)
		}
		
	}

	selectOrganization(point:IOrganization | null){
		if(point){
			this.organizationModel.actionSelectOrganization(point)
			this.organizationStatusModel.actionOrganizationStatus(point.guid)
		}
		/*
		if(point){
			this.organizationModel.actionSelectOrganization(point)
			this.organizationStatusModel.actionOrganizationStatus(point.guid)
		}else{
			this.organizationModel.actionSelectOrganization(null)
			this.organizationStatusModel.actionOrganizationStatus(null)
		}
		*/
	}
}
