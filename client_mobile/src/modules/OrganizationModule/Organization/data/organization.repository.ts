import { guardRepository } from "application/guards/repository.guard";
import { OrganizationEntiti } from "../domain/organization.entity";
import { requestOrganization } from "./organization.request";
import { organizationMapper } from "../interfaces/organization.dto";
import { IOrganizationResponse } from "../interfaces/organization.type";

export class OrganizationRepository extends OrganizationEntiti {

	async getAllOrganization(cityid:string){
		const {data} = await requestOrganization.getAll(cityid) // получаем точки
		const result = guardRepository(this.existingOrganization)(data) // убираем скрытые
		return organizationMapper(result as unknown as IOrganizationResponse)
	}
}