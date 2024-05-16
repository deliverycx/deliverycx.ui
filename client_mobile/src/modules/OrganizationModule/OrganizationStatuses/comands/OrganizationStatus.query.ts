import { InjectableDI } from "application/helpers/dependencyInjection";
import { organizationStatusComandBus } from "modules/OrganizationModule/organization.module";

@InjectableDI()
export class OrganizationStatusQuery{
	useCaseOrganizationStatus: any;
	handlerOrganizationStatus(action:any){
		organizationStatusComandBus.handlersComandSubject.subscribe((data:any) =>{
			if(data){
				action(data)
				organizationStatusComandBus.queryComandSubject.next(data)
			}
			
		})
	}
}