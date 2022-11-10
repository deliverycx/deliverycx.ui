import { compareAsc, format } from 'date-fns'
import { store } from "servises/redux/createStore";


export const workTimeHelp = () =>{
	const storage = store.getState();
	const  {workTime} = storage.location.point
	if(workTime){
		const mok = "10:00-12:00"
		console.log('wwwww',workTime);
		const [min,max] = workTimeCheck(workTime) ? workTimeCheck(workTime).split('-') : mok
		const time = format(new Date(), "HH:mm")

		if(min >= time){
			return true
		}else if(max <= time){
			return true
		}else{
			return false
		}
	}
	return false
}


export const checkEmtpyWork = (work:any,index:number) =>{
	if(!work[index]){
		return checkWorkIsArray(work)
	}else{
		return work[index]
	}
}

export const checkWorkIsArray = (work:any) =>{
	if(typeof work == 'string') return ""
	const result = work.filter((val:string) => val !== "")
	console.log('result fil',result);
	if(result.length === 0){
		return null
	}else if(result.length === 1){
		return result[0]
	}else{
		return result
	}
}


export const workTimeCheck = (work:any):any => {
	const date = new Date().getDay()

	console.log('wokcheck',work);

	if(!work || work.length === 0){
		console.log('время сломано');
		return ""
	}
	if(typeof work !== 'string'){
		
		if(date === 0){
			return checkEmtpyWork(work,6)
		}else{
			return checkEmtpyWork(work,date - 1)
		}
	}else{
		return work
	}
	
}