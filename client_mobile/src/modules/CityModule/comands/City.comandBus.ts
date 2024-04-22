import { Subject } from 'rxjs';

export class CityComandBus{
	protected queryComandSubject = new Subject()
	protected handlersComandSubject = new Subject()
}