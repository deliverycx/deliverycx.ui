import { guardPiPeRepository, guardRepository } from "application/guards/repository.guard";
import { OrganizationEntiti } from "../domain/organization.entity";
import { requestOrganization } from "./organization.request";
import { organizationMapper } from "../interfaces/organization.dto";
import { IOrganizationResponse, pointSerch } from "../interfaces/organization.type";
import { ICityResponse } from "modules/CityModule/interfaces/city.type";
import { map, catchError, of } from "rxjs";

export class OrganizationRepository extends OrganizationEntiti {

	/*
	async getAllOrganization(cityid:string){
		const {data} = await requestOrganization.getAll(cityid) // получаем точки
		const result = guardRepository(this.existingOrganization)(data) // убираем скрытые
		return organizationMapper(result as unknown as IOrganizationResponse)
	}
	*/
	repositoryAllOrganization(cityid:string){
		const points = requestOrganization.getAll(cityid)
			.pipe(
				guardPiPeRepository<IOrganizationResponse[]>(this.existingOrganization),
				map(response => {
					//console.log(response); //cityMapper(response as ICityResponse)
					return organizationMapper(response as unknown as IOrganizationResponse)
				}),
				
				catchError(error => {
					console.log('error: ', error);
					return of(error);
				})
			)
		return points
	}

	repositoryFilterOrganization(filters:string[],cityid:string){
		const points = requestOrganization.filterPoint({
			data:filters,
			cityid
		})
		.pipe(
			guardPiPeRepository<IOrganizationResponse[]>(this.existingOrganization),
			map(response => {
				//console.log(response); //cityMapper(response as ICityResponse)
				return organizationMapper(response as unknown as IOrganizationResponse)
			}),
			
			catchError(error => {
				console.log('error: ', error);
				return of(error);
			})
		)
	return points
	}

	repositoryOrganization(pointid:string){
		const points = requestOrganization.getOrg(pointid)
			.pipe(
				guardPiPeRepository<IOrganizationResponse>(this.existingCardOrganization),
				map(response => {
					//console.log(response); //cityMapper(response as ICityResponse)
					return organizationMapper(response as unknown as IOrganizationResponse)
				}),
				
				catchError(error => {
					console.log('error: ', error);
					return of(error);
				})
			)
		return points
	}

	repositoryOrganizationSerch(value:pointSerch){
		const points = requestOrganization.pointSerch(value)
			.pipe(
				guardPiPeRepository<IOrganizationResponse[]>(this.existingOrganization),
				map(response => {
					//console.log(response); //cityMapper(response as ICityResponse)
					return organizationMapper(response as unknown as IOrganizationResponse)
				}),
				
				catchError(error => {
					console.log('error: ', error);
					return of(error);
				})
			)
		return points
	}
}