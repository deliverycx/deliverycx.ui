import { InjectableDI } from 'application/helpers/dependencyInjection';
import { OrganizationRepository } from '../data/organization.repository';
import { UseCaseOrganization } from '../useCase/organization.useCase';
import { organizationComandBus } from 'modules/OrganizationModule/organization.module';
import { OrganizationStatusHandlers } from 'modules/OrganizationModule/OrganizationStatuses/comands/OrganizationStatus.handlers';
import {
  IOrganization,
  IOrganizationResponse,
  pointSerch,
} from 'modules/OrganizationModule/Organization/interfaces/organization.type';

@InjectableDI([
  UseCaseOrganization,
  OrganizationRepository,
  OrganizationStatusHandlers,
])
export class OrganizationHandlers {
  constructor(
    private readonly useCaseOrganization: UseCaseOrganization,
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationStatusHandlers: OrganizationStatusHandlers,
  ) {}

  async handlerOrganizationsList(cityid: string) {
    try {
      const orglist =
        await this.organizationRepository.repositoryAllOrganization(cityid);
      orglist && this.organizationComand(orglist);
    } catch (error) {
      console.log(error);
    }
  }

  async handlerSerchOrganization(value: pointSerch) {
    try {
      const orglist =
        await this.organizationRepository.repositoryOrganizationSerch(value);
      orglist && this.organizationComand(orglist);
    } catch (error) {
      console.log(error);
    }
  }

  async handlerFilterOrganization(filter: string[], cityid: string) {
    try {
      const orglist =
        await this.organizationRepository.repositoryFilterOrganization(
          filter,
          cityid,
        );
      if (orglist && orglist.length !== 0) {
        this.organizationComand(orglist);
      } else {
        this.handlerOrganizationsList(cityid);
      }
    } catch (error) {
      console.log(error);
    }
  }

  choosePoint(point: IOrganization) {
    organizationComandBus.queryPointComandSubject.next(point);
  }

  organizationComand(orglist: IOrganizationResponse[]) {
    const list = this.useCaseOrganization.organizationAll(orglist);
    organizationComandBus.handlersComandSubject.next(list);
  }
}
