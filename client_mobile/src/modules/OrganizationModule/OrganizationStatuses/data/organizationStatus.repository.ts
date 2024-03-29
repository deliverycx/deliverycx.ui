import { guardPiPeRepository, guardRepository } from "application/guards/repository.guard";
import { OrganizationStatusEntiti } from "../domain/organizationStatus.entity";
import { IPointStatusRequest } from "../interfaces/organizationStatus.type";
import { requestOrganizationStatus, requestOrganizationStatusAPI } from "./organizationStatus.request";
import { organizationMapper } from "modules/OrganizationModule/Organization/interfaces/organization.dto";
import { IOrganizationResponse } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { map, catchError, of } from "rxjs";
import { organizationStatusMapper } from "../interfaces/organizationStatus.dto";

export class OrganizationStatusRepository extends OrganizationStatusEntiti{
	getOrganizationStatus(pointid:string){
		const points = requestOrganizationStatus.getPointStatus(pointid)
			.pipe(
				guardPiPeRepository<IPointStatusRequest>(this.existingOrganizationStatus),
				map(response => {
					//console.log(response); //cityMapper(response as ICityResponse)
					return organizationStatusMapper(response as unknown as IPointStatusRequest)
				}),
				
				catchError(error => {
					console.log('error: ', error);
					return of(error);
				})
			)
		return points
	}

	async getOrganizationStatusAxios(pointid:string){
		const {data} = await requestOrganizationStatusAPI.getPointStatus(pointid)
		const result = guardRepository(this.existingOrganizationStatus)(data) // убираем скрытые города
			if(result){
				const q:any = organizationStatusMapper(result as unknown as IPointStatusRequest)
				return q
			}else{
				throw Error()
			}
	}
}