import { createSelector } from "@reduxjs/toolkit";
import { ROUTE_APP } from "application/contstans/route.const";

import { useEffect, useState, useCallback, useRef } from 'react';

import { adapterSelector } from "servises/redux/selectors/selectors";
import { RootState } from 'servises/redux/createStore';
import { IPoint } from '@types';
import { IInitialValues } from '@types';
import { format } from 'date-fns'
import { ICart } from '@types';
import { IBankCard } from '@types';
import RequestOrder from "servises/repository/Axios/Request/Request.Order";
import { PAYMENT_METODS } from "application/contstans/const.orgstatus";
import { useDispatch } from "react-redux";
import { fetchDeleteCart, accessOrder, fetchDectroyCart } from "servises/redux/slice/cartSlice";
import { useRouter } from "next/router";


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

		/*
		const adress = 
		(orderinfo.address && typeof orderinfo.address === 'string') &&
		orderinfo.address.match(/(?<street>.*?),\s?(?<home>.*)/).groups;
		*/
	
		const result = {
			address: {
				city: this.selectLocationPoint.city,
				street: orderinfo.address || "",
				home: orderinfo.house || "",
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
			orderAmount:this.selectCart.deltaPrice
		}
		
		this.orderStates = result
	}

	metodsOrder(){
		const result = {
			orderType: this.selectCart.orderType,
			paymentMethod: this.selectCardBank.paymentMetod.id,
			
		}

		this.orderStates = result
		//console.log(this.orderState);
	}
}


export function useOrderCreate(this: any) {
	const router = useRouter()
	const hash = location.pathname.split("/")[2];
	const [orderNumber,setOrderNumber] = useState<null | number>(null)
	const [orderLoad, setOrderLoad] = useState(true);
	const dispatch = useDispatch();
	const ref = useRef<NodeJS.Timeout>();

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



	const presentOrder = async (hashNumb: string, tik = 0) => {
		try {
				let tik = 0;
					ref.current = setInterval(async () => {
							const { data } = await RequestOrder.getOrder(hashNumb);
							new Promise((res, rej) => {
									if (data && data.orderNumber) {
											clearInterval(ref.current as any);
											res(data.orderNumber);
									} else {
											++tik;
											rej();
									}
							})
									.then((number) => {
											setOrderNumber(number as number);
											setOrderLoad(false);
									})
									.catch(() => {
											setOrderNumber(null);
											if (tik > 3) {
													clearInterval(ref.current as any);
													setOrderLoad(false);
											} else {
													setOrderLoad(true);
											}
									});
					}, 5000);
			} catch (error) {
					setOrderNumber(null);
					clearInterval(ref.current as any);
			}
	};

	


	const OrderSubmit =  async (orderBody:any) =>{
		
		try {
			const {data} = await RequestOrder.getOrder(hash)
			

			if(!data){
				if(selectCardBank.paymentMetod.id === PAYMENT_METODS.CARD){
					await RequestOrder.OrderCreatePayment(orderBody)
				}else{
					await RequestOrder.OrderCreate(orderBody)
				} 
			}else{
				setOrderNumber(data.orderNumber)
			}
			
		} catch (error) {
			console.log(error);
			setOrderNumber(null)
		}
		
	}




	useEffect(() => {
		if ((location.pathname.split("/")[1] === "ordercreate") && hash) {
			const body = createOrderFabric()
			OrderSubmit(body)
			presentOrder(hash);
		} else {
			router.push(ROUTE_APP.SHOP.SHOP_MAIN);
		}  
		() => {
			clearInterval(ref.current as any);
		};   
	}, [hash]);

	
	

	const handleBacktoCart = () =>{
		router.push(ROUTE_APP.CART.CART_DELIVERY)
	}

	const handleBacktoShop = () => {
		dispatch(fetchDeleteCart());
		dispatch(fetchDectroyCart())
		dispatch(accessOrder());
		router.push(ROUTE_APP.SHOP.SHOP_MAIN);
	};




	this.data({
		orderNumber,
		hash
	});
	this.handlers({
		handleBacktoCart,
		handleBacktoShop
	});
	this.status({
		orderLoad
	});
}