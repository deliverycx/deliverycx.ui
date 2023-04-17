/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-var-requires */

import { DELIVERY_METODS, DILIVERY_TIME_STATUS } from "application/contstans/const.orgstatus"
import { delivertyTime } from "application/helpers/workTime"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setPointStatusDeliveryMetods } from "servises/redux/slice/locationSlice";

/* eslint-disable no-mixed-spaces-and-tabs */
const OnliPICKUPModal = () =>{
	const [modal,setModal] = useState(true)
	const history = useHistory()
	const loc = useLocation()
	const dispatch = useDispatch()

	const classroot = (swap:boolean) =>{
		const root = document.getElementById('root')
		if(root){
			if(swap){
				root.className = "no-scroll"
			}else{
				root.className = ""
			}
		}
	}

	useEffect(()=>{
		const time = delivertyTime()

		if(time && time.status === DILIVERY_TIME_STATUS.ONLIPICKUP){
			setModal(true)
			classroot(true)
		}else{
			setModal(false)
			classroot(false)
		}
	},[loc.pathname])

	const handlerModal = () =>{
		setModal(false)
		classroot(false)
	}

	return(
		<>
		{
			modal &&
			<div className="onspot_modal">
				
				<div className="onspot_modal_section">
				
				
				<img
	      	src={require("assets/img/dualpay.svg").default}
					className="onspot_modal_img"
	        alt="Доставка и самовывоз"
	      />
				<div className="onspot_modal__content">
					<h2 className="dualpay__popup-text">Внимание! <br /> В данный момент доступен самовывоз, хинкальная скоро закроется.</h2>
					<div className="dualpay__popup-deck">
					А пока вы можете ознакомиться с нашим меню и почитать новости.
					</div>
				</div>
				<button type="submit" onClick={()=> handlerModal()}  className="dualpay__popup-btn">Продолжить</button>
				<button type="submit" onClick={()=> history.goBack()}  className="dualpay__popup-back">Отменить</button>
				</div>
				
			</div>
		}
		
		</>
	)
}
export default OnliPICKUPModal