import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import EntitiTest from "./entititest"

class Timer{
	secondsPassed = 0

	constructor() {
		makeAutoObservable(this)
	}

	increaseTimer() {
			this.secondsPassed += 1
	}
}

export const myTimer = new Timer()