import { ROUTE_APP } from 'application/contstans/route.const';
import { basketModel } from 'modules/BasketModule/basket.module';
import { orderUseCase } from 'modules/OrderModule/order.module';
import { organizationModel, useCaseOrganizationStatus } from 'modules/OrganizationModule/organization.module';
import { IUserOrders } from 'modules/Profile/interfaces/profile.type';
import { profileUseCase } from 'modules/Profile/profile.module';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from 'yandex-maps';

export function useUserOrdersViewModel(this:any) {
	const [orderList,setOrderList] = useState<any | null>(null)
	const organization = organizationModel.selectOrganization
	
	useEffect(()=>{
		profileUseCase.userOrderList()
			.then(data =>{
				if(data && organization){
					const orders = data.filter((value) =>{
						return organization.guid === value.order.organization
					})
					orders.length !== 0 && setOrderList(orders)
					
				}
			})
	},[])

	console.log(orderList);


	const navigate = useNavigate()
	const point = organizationModel.selectOrganization


	const returnOrder = (data: IUserOrders) => {
		orderUseCase.orderModel.actionOrderBody(data.orderBody)
		orderUseCase.orderModel.actionOrderDeliveryAddress(data.orderDelivery)
		data.order.orderParams.orderTable && orderUseCase.setOnSpotTable(data.order.orderParams.orderTable)
		//point && useCaseOrganizationStatus.findDeliveryType(data.order.orderParams.orderType,point)
		data.order.orderItems && data.order.orderItems.map((item) => {
			const cartbody = {
				anmount: item.amount,
				orderType: data.order.orderParams.orderType,
				organization: data.order.organization,
				userid: data.order.user,
				product: {
					id: item.id,
					image: item.productImage,
					name: item.productName,
					price: item.oneprice,
					productId: item.productId,
					tags: item.productTags
				}

			}
		
			basketModel.repositoryAddToCart(cartbody)
			
		})
		navigate(ROUTE_APP.ORDER.ORDER_MAIN)
	}
	
	this.data({
		orderList,
		organization
	});
	this.handlers({
		returnOrder
	});
	this.status({
		
	});
}