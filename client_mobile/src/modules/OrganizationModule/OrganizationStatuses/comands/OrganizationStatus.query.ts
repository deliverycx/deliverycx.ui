import { InjectableDI } from 'application/helpers/dependencyInjection';
import { organizationStatusComandBus } from 'modules/OrganizationModule/organization.module';

@InjectableDI()
export class OrganizationStatusQuery {
  handlerOrganizationStatus(action: (data: any) => void) {
    return organizationStatusComandBus.handlersComandSubject.subscribe(
      (data: any) => {
        console.log('qyery', data);
        if (data) {
          action(data);
          organizationStatusComandBus.queryComandSubject.next(data);
        }
      },
    );
  }
}
