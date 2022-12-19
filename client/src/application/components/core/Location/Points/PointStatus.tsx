/* eslint-disable @typescript-eslint/no-var-requires */
import { DELIVERY_METODS } from 'application/contstans/const.orgstatus';
import React from 'react';
import { adapterSelector } from 'servises/redux/selectors/selectors';

const PointStatus = () => {
	const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)

	const statuses = [
		{
			name:"Только самовывоз",
			exect: (pointstatus.deliveryMetod.includes(DELIVERY_METODS.PICKUP) && pointstatus.deliveryMetod.length === 1),
			content:(
				<div className="welcome__select-adress__info onlypickup">
					<img
						src={require("assets/i/bag-red.svg").default}
						alt="Только самовывоз"
					/>
					<span>Только самовывоз</span>
				</div>
			)
		},
		{
			name:'доставка',
			exect: (pointstatus.deliveryMetod.includes(DELIVERY_METODS.COURIER) && pointstatus.deliveryMetod.includes(DELIVERY_METODS.PICKUP)),
			content:(
				<div className="welcome__select-adress__info onlypickup">
					<img
						src={require("assets/i/moto-red.svg").default}
						alt="Доставка и самовывоз"
					/>
					<span>Доставка и самовывоз</span>
				</div>
			)
		}
	]

	const switchMetod = () =>{
		const wrappers = statuses.filter((val:typeof statuses[0]) =>{
			console.log('exee',val.exect);
			return val.exect
		})
		
		const w = wrappers.map((wrapp:typeof statuses[0],index:number) => {
      return React.createElement(React.Fragment, {key: index}, wrapp.content)
    })
		return React.createElement(React.Fragment, null, w)
	}

	
	return (
		<>
		{
			switchMetod()
		}
		
			
		</>
	)
}
export default PointStatus