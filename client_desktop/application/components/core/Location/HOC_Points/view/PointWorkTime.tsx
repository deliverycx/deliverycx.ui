import { FC, useState, useEffect } from "react"
import cn from "classnames";
import { checkWorkIsArray, workTimeCheck } from "application/helpers/workTime";
import { IPoint } from "@types";


const PointWorkTime:FC<{worktime:string[],adress:IPoint} > = ({worktime,adress}) => {
	const [select,setSelect] = useState(false)
	const [activeDate,setActiveDate] = useState<number>(0)

	const dni = ["Понедельник", 
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
		"Воскресенье"]

	const date = new Date().getDay()	
	const CN = cn("timearrow", { timearrow_open:select})

	useEffect(()=>{
		if(date === 0){
			setActiveDate(6)
		}else{
			setActiveDate(date - 1)
		}
	},[date,worktime])


	useEffect(()=>{
		setSelect(false)
	},[adress.address])

	const checktype = !!(typeof checkWorkIsArray(worktime) === 'string')


	return (
		<div className="welcome_worktime">
			<div className="welcome__select-adress__info worktime-time" onClick={()=> setSelect(prev => !prev)}>
				<img
					src="/images/icon/timework.svg"
					alt="Телефон заведения"
				/>
				<span>{workTimeCheck(worktime,adress.guid) === "00:00-00:00" ? "Закрыта" : workTimeCheck(worktime,adress.guid)}</span>
				{
					!checktype &&
					<div className={CN}></div>
					
				}
				
			</div>
			{
				 select && !checktype &&
				<div className="welcome_timebox">
					<div className="welcome_timebox_item"><span className="welcome_timebox_item--title">График работы:</span></div>	
					{
						worktime.map((value:string,index:number)=>{
							const CNActive = cn("welcome_timebox_item", { active:activeDate === index})
							return (
								<div key={index} className={CNActive}>
									<span>{dni[index]}</span>
									<span>{value}</span>
								</div>
							)
						})
					}
				</div>
			}
			
		</div>
	)
}
export default PointWorkTime