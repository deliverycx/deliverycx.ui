import { CityModel } from "modules/CityModule/domain/city.model";
import { OrganizationModel } from "../domain/organization.model";


export class UseCaseOrganization{


	constructor(
		public readonly organizationModel:OrganizationModel,
		public readonly cityModel:CityModel
	){}
	
	async organizationAll(){
		if(this.cityModel.selectCity && this.cityModel.selectCity.id){
			const cityid = this.cityModel.selectCity.id
			return await this.organizationModel.actionSetOrganizationAll(cityid)
		}
		
	}
}
