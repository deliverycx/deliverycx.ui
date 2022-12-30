/* eslint-disable no-mixed-spaces-and-tabs */

import { QUERY_APP } from "application/contstans/route.const";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import { CART_CHOICE } from "application/contstans/cart.const";
import { boolean } from "yup";

/* eslint-disable @typescript-eslint/no-var-requires */
const OnspotModal = () =>{
	const loc = useLocation()
	const query = new URLSearchParams(loc.search);
	const table = query.get(QUERY_APP.ONSPOT_TABLE)
	const delivMetod = query.get(QUERY_APP.DELIVERY_METOD)

	const [modal,setModal] = useState(false)

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
		if(table && delivMetod === CART_CHOICE.ONSPOT){
			setModal(true)
			classroot(true)
			
		}else{
			setModal(false)
			classroot(false)
		}
	},[])

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
	      	src={require("assets/img/logo-choose-city.svg").default}
	        alt="Доставка и самовывоз"
	      />
				
				<img
	      	src={require("assets/img/onspotmodal.svg").default}
					className="onspot_modal_img"
	        alt="Доставка и самовывоз"
	      />
				<div className="onspot_modal__content">
					<h2 className="onspot_modal__content-title">Гамарджоба!</h2>
					<div className="onspot_modal__content-text">
						Рады, что вы выбрали наш новый <br /> способ заказа за столиком!
					</div>
					<div className="onspot_modal__content-text">
						Это тестовый период, поэтому если возникнут <br /> сложности сообщите пожалуйста официанту или <br /> в  нашу поддержку! 
					</div>
				</div>
				</div>
				<button className="onspot_modal__button" onClick={()=> handlerModal()}>Продолжить</button>
			</div>
		}
		
		</>
	)
}
export default OnspotModal