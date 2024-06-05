import { Subject } from 'rxjs';

export class CityComandBus {
  queryComandSubject = new Subject();
  handlersComandSubject = new Subject();
}
