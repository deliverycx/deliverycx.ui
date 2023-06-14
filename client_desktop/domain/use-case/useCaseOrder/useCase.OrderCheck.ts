import { IInitialValues } from "@types";
import { PAYMENT_METODS } from "application/contstans/const.orgstatus";
import { ROUTE_APP } from "application/contstans/route.const";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { adapterSelector } from "servises/redux/selectors/selectors";
import { fetchOrderCart, setENErrors, setOrderInfo } from "servises/redux/slice/cartSlice";
import { RequestCart } from "servises/repository/Axios/Request";


export function useOrderCheck(this:any) {
	const router = useRouter()
  const dispatch = useDispatch()

	const {guid} = adapterSelector.useSelectors(selector => selector.point)
 

	const handlerSubmitOrder = async (value:IInitialValues) =>{
		try {
			dispatch(setOrderInfo(value))
			const request = await RequestCart.OrderCheckCart({
				organizationid:guid,
				address:value
			})
			if(request.status === 201 && typeof request.data === 'string'){
				router.push(ROUTE_APP.ORDER_CREATE + '/' + request.data)
			}
		} catch (error) {
			console.log(error);
			dispatch(setENErrors({
				status:500,
				error:{
					errors:"Ошибка"
				}
				
			}))
		}

	}

	this.data({
	
	});
	this.handlers({
		handlerSubmitOrder
	});
	this.status({
			
	});
}