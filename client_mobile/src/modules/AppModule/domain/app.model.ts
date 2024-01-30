import { action, makeObservable, observable } from "mobx";

export class AppModel{
	authnotificate = false
	youcity = false

	constructor() {
		makeObservable(this, {
			authnotificate: observable,
			youcity:observable,
			actionAuthNotificate: action,
			actionYoucity:action
		})
		
	}

	actionAuthNotificate(val:boolean){
		this.authnotificate = val
	}

	actionYoucity(val:boolean){
		this.youcity = val
	}
}