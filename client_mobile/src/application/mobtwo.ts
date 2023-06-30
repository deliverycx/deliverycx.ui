import { action, computed, flow, makeAutoObservable, makeObservable, observable } from "mobx"
import { observer } from "mobx-react-lite"
import EntitiTest, {entitiTest} from "./entititest"

class Names extends EntitiTest{
	name = 'vasa'
	store

	constructor() {
		super()
		makeObservable(this, {
			store:observable,
			increaseTimer: action,
	})
		this.store =  this.entiti
	}

	increaseTimer(msg:string) {
		
		//this.handlerHello(this.store,msg)
	}
}

export const myName = new Names()