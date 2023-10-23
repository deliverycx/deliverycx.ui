import { format } from 'date-fns'
import { IAddressDelivery } from 'modules/Profile/interfaces/profile.type'
import { IOrderuserProfile } from '../interfaces/orderCreate.type'
import { OrganizationModel } from 'modules/OrganizationModule/Organization/domain/organization.model'
import { OrganizationStatusModel } from 'modules/OrganizationModule/OrganizationStatuses/domain/organizationStatus.model'
import { OrderModel } from './order.model'
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { IInitialValues, IOrderOnspotTable } from '../interfaces/order.type'
import { IDeliveryTypes, IPointStatus } from 'modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type'
import { IBasketPrice } from 'modules/BasketModule/interfaces/basket.type'

export class OrderCreateEntity{
	protected orderState = {}


	get orderStates(){
		return this.orderState
	}
	set orderStates(val:any){
		this.orderState = {...this.orderState,...val}
	}

	prepareAddress(adress:IAddressDelivery){
	
		/*
		const adress = 
		(orderinfo.address && typeof orderinfo.address === 'string') &&
		orderinfo.address.match(/(?<street>.*?),\s?(?<home>.*)/).groups;
		*/
	
		const result = {
			address: {
				city: adress.city,
				street: adress.address || "",
				home: adress.house || "",
				flat: adress.flat,
				intercom: adress.intercom,
				entrance: adress.entrance,
				floor: adress.floor,
				kladrid:adress.kladrid
			}
		}
		this.orderStates = result
	}


	bodyOrder(bodyorder:IInitialValues){
		const result = {
			name: bodyorder.name,
			phone: bodyorder.phone,
      comment: bodyorder.comment,
			money:bodyorder.money,
			timedelivery:bodyorder.timedelivery,
			paymentMethod: bodyorder.payment,
		}
		
		this.orderStates = result
	}
	

	defaultBody(hashCode = "",organization:IOrganization){
		const result = {
			organizationid: organization.guid,
			localhost:`${document.location.protocol}//${document.location.host}`,
			hash:hashCode,
			date:`${format(new Date(), 'yyyy-MM-dd')} ${new Date().toLocaleTimeString()}`,
		}
		
		this.orderStates = result
	}

	/**/
	metodsOrder(
		orderType:IDeliveryTypes,
		orderTable:IOrderOnspotTable,
		orderPrice:IBasketPrice,
	){
		const result = {
			orderType: orderType.metod,
			orderTable:orderTable,
			orderAmount:orderPrice.totalPrice
		}

		this.orderStates = result
		//console.log(this.orderState);
	}
	
}