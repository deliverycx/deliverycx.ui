import { InjectableDI } from "application/helpers/dependencyInjection";
import { IOrganization, pointSerch } from "../../interfaces/types/organization.type";
import { RequestOrganizationApi } from "../../domain/repositories/organization.request";
import { DTOMapper } from "shared/utils/dto";
import { organizationMapper } from "../mapping/organization.mapps";



@InjectableDI([RequestOrganizationApi])
export class OrganizationRepository {
	constructor(private readonly requestOrganizationApi: RequestOrganizationApi) { }

	@DTOMapper(organizationMapper)
	async repositoryAllOrganization(cityid: string) {
		try {
			const { data } = await this.requestOrganizationApi.getAll(cityid);
			return data as unknown as IOrganization[];
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryFilterOrganization(filters: string[], cityid: string) {
		try {
			const { data } = await this.requestOrganizationApi.filterPoint({
				data: filters,
				cityid,
			});
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async repositoryOrganizationSerch(value: pointSerch) {
		try {
			const { data } = await this.requestOrganizationApi.pointSerch(value);
			return data;
		} catch (error) {
			console.log(error);
		}
	}


}
