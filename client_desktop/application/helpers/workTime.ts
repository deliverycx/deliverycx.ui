import { compareAsc, format } from 'date-fns'
import { store } from "servises/redux/createStore";


const trueDate = new Date()
function formatDate(date:any) {

  var dd:any = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm:any = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy:any = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

const ng = [
	{
		id:"fe470000-906b-0025-00f6-08d8de6557e1",
		data:[
			{
				d:new Date(2022,11,28),
				time:"00:00-00:00"
			},
			{
				d:new Date(2022,11,29),
				time:"11:00-15:00"
			},
			
		]
	},
	{
		id:"fe470000-906b-0025-307f-08d8dfb88a89",
		data:[
			{
				d:new Date(2022,11,28),
				time:"12:00-18:00"
			},
			{
				d:new Date(2022,11,29),
				time:"00:00-00:00"
			},
		]
	}
]
export const ngFN = (org:any) =>{
	let time:any

	
	ng.forEach((val:any) =>{
		//console.log(val.id,org);
		if(val.id == org){
			
			val.data.forEach((value:any) =>{
				//console.log(formatDate(trueDate),formatDate(value.d));
				//console.log(trueDate,value.d);
				if(formatDate(trueDate) === formatDate(value.d)){
					//console.log(value.time);
					time = value.time
				}
			})
		}
	})
	//console.log('time',time );
	return time
}


export const workTimeHelp = (org?:any) =>{
	const storage = store.getState();
	const  {workTime,guid} = storage.location.point

	const NGtime = org ? ngFN(org) : ngFN(guid)
	if(workTime){
		const mok = "10:00-12:00"
		const [min,max] = NGtime ? NGtime.split('-') : workTimeCheck(workTime).split('-') //workTimeCheck(workTime) ? workTimeCheck(workTime).split('-') : mok
		const time = format(new Date(), "HH:mm")
		console.log('workTime',workTime);

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

	if(result.length === 0){
		return null
	}else if(result.length === 1){
		return result[0]
	}else{
		return result
	}
}


export const workTimeCheck = (work:any,org?:any):any => {
	const date = new Date().getDay()

	const NGtime = org && ngFN(org)

	if(NGtime){
		return NGtime
	}

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