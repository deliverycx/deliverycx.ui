import { DILIVERY_TIME_STATUS } from 'application/contstans/const.orgstatus';
import { compareAsc, format } from 'date-fns'




export const workTimeHelp = (work:any) =>{
	


	if(work){
		const mok2 = "10:00-21:00"
		/*
		const mok = workTime || work
		const [min,max] = mok ? mok2.split('-') : mok2.split('-')
		*/
		const [min,max] = workTimeCheck(work) ? workTimeCheck(work).split('-') : mok2
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

export const checkEmtpyWork = (work:string | string[],index:number) =>{
	if(!work[index]){
		return checkWorkIsArray(work)
	}else{
		return work[index]
	}
}

export const checkWorkIsArray = (work:any) =>{
	if(typeof work == 'string') return ""
	const result = work.filter((val:string) => val !== "")
	//console.log('result fil',result);
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

	//console.log('wokcheck',work);

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


export const delivertyTime = (workTime:any,deliveryTime:any) =>{
	
	if(workTime && deliveryTime){
		

		const onliPickUPTime = new Date();
		const noDeliveryTime = new Date();

		if(workTimeCheck(workTime) && deliveryTime){
			const [min,max] = workTimeCheck(workTime).split('-')
			
			const timepickup = format(onliPickUPTime.setMinutes(onliPickUPTime.getMinutes() + deliveryTime), "HH:mm")
			const nodelivery = format(noDeliveryTime.setMinutes(noDeliveryTime.getMinutes() + 30), "HH:mm")

		

			if(nodelivery > max){
				return {
					status:DILIVERY_TIME_STATUS.NODELIVERY
				}
			}

			if(timepickup > max){
				return {
					status:DILIVERY_TIME_STATUS.ONLIPICKUP
				}
			}
			
			

			return false
	}
	
	}
}



/*
class WorkTimeHelps{
	private readonly workTime:string[] | string = ""
	private readonly mok = "10:00-21:00"

	workTimeCheck(){
		if(!this.workTime || work.length === 0){
			console.log('время сломано');
			return ""
		}
	}

}
*/