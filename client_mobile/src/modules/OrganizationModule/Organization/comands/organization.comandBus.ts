import { Subject } from "rxjs"

export class OrganizationComandBus{
	queryComandSubject = new Subject()
	handlersComandSubject = new Subject()
	queryPointComandSubject = new Subject()
}