/* eslint-disable no-mixed-spaces-and-tabs */
import { organizationComandBus } from 'modules/OrganizationModule/organization.module';
import { IOrganization } from '../interfaces/organization.type';
import { InjectableDI } from 'application/helpers/dependencyInjection';
import { OrganizationStatusHandlers } from 'modules/OrganizationModule/OrganizationStatuses/comands/OrganizationStatus.handlers';

@InjectableDI([OrganizationStatusHandlers])
export class OrganizationQuery {
  constructor(
    private readonly organizationStatusHandlers: OrganizationStatusHandlers,
  ) {}

  handleOrganizationListMerdgeStatus(action: any) {
    organizationComandBus.handlersComandSubject.subscribe(async (data: any) => {
      try {
        if (data && data.length !== 0) {
          const reduseOrg = await Promise.all(
            data.map(async (value: IOrganization) => {
              const status =
                await this.organizationStatusHandlers.handlerOrganizationsListStatus(
                  value,
                );
              if (value.guid === status?.organization) {
                return {
                  ...value,
                  ...status,
                };
              }
            }),
          );

          action(reduseOrg);
          organizationComandBus.queryComandSubject.next(data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  handlerPointQuery(action: any) {
    organizationComandBus.queryPointComandSubject.subscribe((data: any) => {
      if (data) {
        action(data);
      }
    });
  }
}
