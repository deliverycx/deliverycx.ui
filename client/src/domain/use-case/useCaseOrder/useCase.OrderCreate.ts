import { createSelector } from "@reduxjs/toolkit";
import { ROUTE_APP } from "application/contstans/route.const";

import { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { RootState } from 'servises/redux/createStore';
import { IPoint } from '@types';
import { IInitialValues } from '@types';
import { format } from 'date-fns'
import { ICart } from '@types';
import { IBankCard } from '@types';
import RequestOrder from "servises/repository/Axios/Request/Request.Order";
import { PAYMENT_METODS } from "application/contstans/const.orgstatus";


class CreateOrder{
	protected orderState = {}

	constructor(
		public readonly selectCart:ICart,
		public readonly selectLocationPoint:IPoint,
		public readonly selectCardBank:IBankCard
	){

	}

	get orderStates(){
		return this.orderState
	}
	set orderStates(val:any){
		this.orderState = {...this.orderState,...val}
	}

	prepareAddress(){
		const orderinfo:any = this.selectCart.orderInfo

		const adress = 
		(orderinfo.address && typeof orderinfo.address === 'string') &&
		orderinfo.address.match(/(?<street>.*?),\s?(?<home>.*)/).groups;
	
		const result = {
			address: {
				city: this.selectLocationPoint.city,
				street: adress.street || "",
				home: adress.home || "",
				flat: orderinfo.flat,
				intercom: orderinfo.intercom,
				entrance: orderinfo.entrance,
				floor: orderinfo.floor,
				kladrid:orderinfo.kladrid
			}
		}
		this.orderStates = result
	}

	bodyOrder(hashCode:string){
		const result = {
			organization: this.selectLocationPoint.guid,
			name: this.selectCart.orderInfo.name,
      date:`${format(new Date(), 'yyyy-MM-dd')} ${new Date().toLocaleTimeString()}`,
			phone: this.selectCart.orderInfo.phone,
      comment: this.selectCart.orderInfo.comment,
			localhost:`${document.location.protocol}//${document.location.host}`,
			hash:hashCode,
			orderAmount:this.selectCart.orderPrice.deltaPrice
		}
		
		this.orderStates = result
	}

	metodsOrder(){
		const result = {
			orderType: this.selectCart.orderType,
			paymentMethod: this.selectCardBank.paymentMetod.id,
			orderTable:this.selectCart.orderTable,
		}

		this.orderStates = result
		console.log(this.orderState);
	}
}


export function useOrderCreate() {
	const history = useHistory()
	const location = useLocation();
	const hash = location.pathname.split("/")[2];


	const selectLocationPoint = adapterSelector.useSelectors(selector => selector.point)
	const selectCart = adapterSelector.useSelectors(selector => selector.cart)
	const selectCardBank = adapterSelector.useSelectors(selector => selector.bankcard)

	const createOrderFabric = () =>{
		const createOrder = new CreateOrder(
			selectCart,
			selectLocationPoint,
			selectCardBank
		)
		createOrder.prepareAddress()
		createOrder.bodyOrder(hash)
		createOrder.metodsOrder()
		return createOrder.orderStates
	}

	


	const OrderSubmit = async (orderBody:any) =>{
		
		try {
			if(selectCardBank.paymentMetod.id === PAYMENT_METODS.CARD){
				const {data} = await RequestOrder.OrderCreatePayment(orderBody)
				console.log(data);
			}else{
				const result = await RequestOrder.OrderCreate(orderBody)
			} 
			
		} catch (error) {
			console.log(error);
		}
		
	}

	useEffect(() => {
		if ((location.pathname.split("/")[1] === "ordercreate") && hash) {
			const body = createOrderFabric()
			OrderSubmit(body)
		} else {
				history.push(ROUTE_APP.SHOP.SHOP_MAIN);
		}     
	}, [hash]);

	
	

	const handleBacktoCart = () =>{
		history.push(ROUTE_APP.CART.CART_DELIVERY)
	}

	this.data({

	});
	this.handlers({
		handleBacktoCart
	});
	this.status({
			
	});
}