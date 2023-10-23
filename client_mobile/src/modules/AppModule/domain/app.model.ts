import { action, makeObservable, observable } from "mobx";

export class AppModel{
	authnotificate = false

	constructor() {
		makeObservable(this, {
			authnotificate: observable,
			actionAuthNotificate: action,
		})
		
	}

	actionAuthNotificate(val:boolean){
		this.authnotificate = val
	}
}