import { IPointStatus } from "@types"
import { DELIVERY_METODS, ORG_STATUS } from "application/contstans/const.orgstatus"
import { workTimeHelp } from "application/helpers/workTime"
import React, { ReactNode } from "react"
import { adapterSelector } from "servises/redux/selectors/selectors"

export class StatusTSX {
	public readonly pointstatus:IPointStatus
	public statuses:any[] = []
	constructor(pointstatus:IPointStatus){
		this.pointstatus = pointstatus
	}

	private init(name:string,exect:boolean,content:ReactNode){
		this.statuses.push({
			name:name,
			exect: exect,
			content:content
		})
		return exect
	}

	OnliPICKUP(tsx?:ReactNode){
		return this.init(
			"Только самовывоз",
			(this.pointstatus.deliveryMetod.includes(DELIVERY_METODS.PICKUP) && 
			this.pointstatus.deliveryMetod.length === 1) &&
			(
				this.pointstatus.organizationStatus !== ORG_STATUS.OPEN && 
				this.pointstatus.organizationStatus !== ORG_STATUS.NODELIVERY &&
				this.pointstatus.organizationStatus !== ORG_STATUS.NOWORK
			),
			tsx
		)
	}
	Delivery(tsx?:ReactNode){
		return this.init(
			'доставка и самовывоз',
			(
				this.pointstatus.deliveryMetod.includes(DELIVERY_METODS.COURIER) && 
				this.pointstatus.deliveryMetod.includes(DELIVERY_METODS.PICKUP)
			) &&
			(
				this.pointstatus.organizationStatus !== ORG_STATUS.OPEN && 
				this.pointstatus.organizationStatus !== ORG_STATUS.NODELIVERY &&
				this.pointstatus.organizationStatus !== ORG_STATUS.NOWORK
			),
			tsx
		)
	}
	OpenPoint(tsx?:ReactNode){
		return this.init(
			'Открытие',
			this.pointstatus.organizationStatus === ORG_STATUS.OPEN,
			tsx
		)
	}
	NoDeliveryPoint(tsx?:ReactNode){
		return this.init(
			'нет заказа',
			this.pointstatus.organizationStatus === ORG_STATUS.NODELIVERY,
			tsx
		)
	}
	NoWorkPoint(tsx?:ReactNode){
		return this.init(
			'точка не работает',
			this.pointstatus.organizationStatus === ORG_STATUS.NOWORK,
			tsx
		)
	}
}


export const useOrganizationStatus = ():[StatusTSX,any] =>{
	const pointstatus = adapterSelector.useSelectors(selector => selector.pointstatus)

	const tsx  = new StatusTSX(pointstatus)


	const switchMetod = () =>{
		const wrappers = tsx.statuses.filter((val:typeof tsx.statuses[0]) =>{
			return val.exect
		})
		
		const w = wrappers.map((wrapp:typeof tsx.statuses[0],index:number) => {
      return React.createElement(React.Fragment, {key: index}, wrapp.content)
    })
		return React.createElement(React.Fragment, null, w)
	}

	return [tsx,switchMetod]
}