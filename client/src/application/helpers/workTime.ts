import { compareAsc, format } from 'date-fns'
import { store } from "servises/redux/createStore";


export const workTimeHelp = (work?:string) =>{
	const storage = store.getState();
	const  {workTime} = storage.location.point
	if(workTime || work){
		const mok = "10:00-12:00"
		const [min,max] = mok ? mok.split('-') : workTime.split('-')
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