import { action, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

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
		makePersistable(this, {
			name: 'order',
			properties: ['youcity'],
			storage: window.localStorage,
			expireIn: 86400,
			removeOnExpiration: true,
		});
	}

	actionAuthNotificate(val:boolean){
		this.authnotificate = val
	}

	actionYoucity(val:boolean){
		this.youcity = val
	}
}