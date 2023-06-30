import repository from "./repository"

export default class EntitiTest{
	entiti = {
		foo:'pup'
	}


	increaseTimer(store:any,payload:any){
		return store.foo += payload
	}

}
export const entitiTest = new EntitiTest()