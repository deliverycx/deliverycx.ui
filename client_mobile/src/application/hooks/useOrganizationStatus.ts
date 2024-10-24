/* eslint-disable @typescript-eslint/no-inferrable-types */

import { DELIVERY_METODS, ORG_STATUS } from "application/contstans/const.orgstatus"
import { workTimeHelp } from "application/helpers/workTime"
import { IPointStatus } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type"
import { organizationModel, organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module"
import React, { ReactNode } from "react"
import { useQuery } from "react-query"


export class StatusTSX {
	public readonly pointstatus: {
		organizationStatus: string
		timeworkOrganization: string
		deliveryTipe:any
	}
	public statuses: {
		name: string
		exect: boolean
		content: ReactNode
	} | null = null
	constructor(organizationStatus: string = '', timeworkOrganization: string = '',deliveryTipe:any = []) {
		this.pointstatus = {
			organizationStatus,
			timeworkOrganization,
			deliveryTipe
		}
	}

	private init(name: string, exect: boolean, content: ReactNode) {
		/*
		this.statuses.push({
			name:name,
			exect: exect,
			content:content
		})
		*/
		if (exect) {
			this.statuses = {
				name,
				exect,
				content
			}
			return true
		}

		return false
	}


	OpenPoint(tsx?: ReactNode) {
		return this.init(
			'Открытие',
			this.pointstatus.organizationStatus === ORG_STATUS.OPEN,
			tsx
		)
	}
	NoDeliveryPoint(tsx?: ReactNode) {
		return this.init(
			'нет заказа',
			this.pointstatus.organizationStatus === ORG_STATUS.NODELIVERY,
			tsx
		)
	}
	NoWorkPoint(tsx?: ReactNode) {
		return this.init(
			'точка не работает',
			this.pointstatus.organizationStatus === ORG_STATUS.NOWORK,
			tsx
		)
	}

	NoTimeWork(tsx?: ReactNode) {
		return this.init(
			'закрылась',
			this.pointstatus.timeworkOrganization === ORG_STATUS.NOWORK && this.pointstatus.organizationStatus === ORG_STATUS.WORK,
			tsx
		)
	}

	ONTimeWork(tsx?: ReactNode) {
		return this.init(
			'скоро закроется',
			this.pointstatus.timeworkOrganization === ORG_STATUS.ONWORK && this.pointstatus.organizationStatus === ORG_STATUS.WORK,
			tsx
		)
	}

	OnliPICKUP(tsx?:ReactNode){
		const picup = this.pointstatus.deliveryTipe.find((val:any) =>{
			return val.metod === DELIVERY_METODS.COURIER
		})

		

		return this.init(
			"Только самовывоз",
			!picup &&
			(
				this.pointstatus.organizationStatus !== ORG_STATUS.OPEN && 
				this.pointstatus.organizationStatus !== ORG_STATUS.NODELIVERY &&
				this.pointstatus.organizationStatus !== ORG_STATUS.NOWORK
			),
			tsx
		)
	}
}


export const useOrganizationStatus = (): [StatusTSX, any] => {
	const { organizationStatus,timeworkOrganization,deliveryTipe } = organizationStatusModel


	
	useQuery('pointstatus', () => useCaseOrganizationStatus.statusOrganization(), {
		refetchOnWindowFocus: true,
	})

	const tsx = new StatusTSX(organizationStatus as string, timeworkOrganization?.typework,deliveryTipe)


	const switchMetod = () => {
		/*
		const wrappers = tsx.statuses.filter((val:typeof tsx.statuses[0]) =>{
			return val.exect
		})
		console.log(wrappers);
		const w = wrappers.map((wrapp:typeof tsx.statuses[0],index:number) => {
			return React.createElement(React.Fragment, {key: index}, wrapp.content)
		})
		return React.createElement(React.Fragment, null, w)
		*/
		const wrappers = tsx.statuses
		
		if (wrappers) {
			const w = React.createElement(React.Fragment, { key: wrappers.name }, wrappers.content)
			return React.createElement(React.Fragment, null, w)
		}
		return false
	}

	

	return [tsx, switchMetod]
}