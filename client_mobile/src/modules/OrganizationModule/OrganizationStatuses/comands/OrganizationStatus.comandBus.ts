import { Subject } from 'rxjs';

export class OrganizationStatusComandBus {
  queryComandSubject = new Subject();
  handlersComandSubject = new Subject();
}
