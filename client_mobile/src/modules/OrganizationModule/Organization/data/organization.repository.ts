import {
  guardPiPeRepository,
  guardRepository,
} from 'application/guards/repository.guard';
import { OrganizationEntity } from '../domain/organization.entity';
import {
  requestOrganization,
  requestOrganizationApi,
} from './organization.request';
import { organizationMapper } from '../interfaces/organization.dto';
import {
  IOrganizationResponse,
  pointSerch,
} from '../interfaces/organization.type';
import { ICityResponse } from 'modules/CityModule/interfaces/city.type';
import { map, catchError, of } from 'rxjs';
import { DTOMapper } from 'application/guards/aplication.guard';
import { InjectableDI } from 'application/helpers/dependencyInjection';

@InjectableDI()
export class OrganizationRepository {
  async repositoryAllOrganization(cityid: string) {
    try {
      const { data } = await requestOrganizationApi.getAll(cityid);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async repositoryFilterOrganization(filters: string[], cityid: string) {
    try {
      const { data } = await requestOrganizationApi.filterPoint({
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
      const { data } = await requestOrganizationApi.pointSerch(value);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  repositoryOrganization(pointid: string) {
    const points = requestOrganization.getOrg(pointid).pipe(
      //guardPiPeRepository<IOrganizationResponse>(this.existingCardOrganization),
      map((response) => {
        //console.log(response); //cityMapper(response as ICityResponse)
        return organizationMapper(response as unknown as IOrganizationResponse);
      }),

      catchError((error) => {
        console.log('error: ', error);
        return of(error);
      }),
    );
    return points;
  }
}
