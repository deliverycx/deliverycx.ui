import { CityModel } from "modules/CityModule/domain/city.model";
import { OrganizationModel } from "../domain/organization.model";
import { IOrganization } from "../interfaces/organization.type";


export class UseCaseOrganization{


	constructor(
		public readonly organizationModel:OrganizationModel,
		public readonly cityModel:CityModel
	){}
	
	organizationAll(){
		if(this.cityModel.selectCity && this.cityModel.selectCity.id){
			const cityid = this.cityModel.selectCity.id
			this.organizationModel.actionSetOrganizationAll(cityid)
		}
		
	}

	selectOrganization(point:IOrganization | null){
		this.organizationModel.actionSelectOrganization(point ? point.guid : null)
	}

	
}
