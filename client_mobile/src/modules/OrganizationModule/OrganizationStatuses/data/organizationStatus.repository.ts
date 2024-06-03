import {
  guardPiPeRepository,
  guardRepository,
} from 'application/guards/repository.guard';

import { IPointStatusRequest } from '../interfaces/organizationStatus.type';
import {
  requestOrganizationStatus,
  requestOrganizationStatusAPI,
} from './organizationStatus.request';
import { organizationMapper } from 'modules/OrganizationModule/Organization/interfaces/organization.dto';
import { IOrganizationResponse } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { map, catchError, of } from 'rxjs';
import { organizationStatusMapper } from '../interfaces/organizationStatus.dto';
import { InjectableDI } from 'application/helpers/dependencyInjection';

@InjectableDI()
export class OrganizationStatusRepository {
  async repositoryOrganizationStatus(pointid: string) {
    try {
      const { data } =
        await requestOrganizationStatusAPI.getPointStatus(pointid);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
