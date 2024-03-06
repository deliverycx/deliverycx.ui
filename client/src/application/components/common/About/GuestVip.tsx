/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-mixed-spaces-and-tabs */
import { ROUTE_APP } from 'application/contstans/route.const';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RequestAdmin } from 'servises/repository/Axios/RequestAdmin';

const GuestVip = () =>{
	const [vip,setVip] = useState()
	const history = useHistory();

	const getVip = async () =>{
		try {
			const {data} = await RequestAdmin.getVip()
			if(data){
				if(!data.guestvip){
					history.push(ROUTE_APP.MAIN)
				}
				setVip(data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		getVip()
	},[])

	return(
		<div className="onspot_modal">
				
				<div className="onspot_modal_section">
				
				
				<img
	      	src={require("assets/img/dualpay.svg").default}
					className="onspot_modal_img"
	        alt="Доставка и самовывоз"
	      />
				<div className="onspot_modal__content">
					<h2 className="dualpay__popup-text">Скидка 100%</h2>
					<a className="dualpay__popup-deck" href=''>
					#кручетолькохинкалыч
					</a>
				</div>
				
				</div>
				
			</div>
	)
}
export default GuestVip