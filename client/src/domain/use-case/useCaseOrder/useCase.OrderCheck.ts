import { IInitialValues } from "@types";
import { PAYMENT_METODS } from "application/contstans/const.orgstatus";
import { ROUTE_APP } from "application/contstans/route.const";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { adapterSelector } from "servises/redux/selectors/selectors";
import { fetchOrderCart, setENErrors, setErrors, setOrderInfo } from "servises/redux/slice/cartSlice";
import { RequestCart } from "servises/repository/Axios/Request";


export function useOrderCheck() {
	const history = useHistory()
	const dispatch = useDispatch()

	const { guid } = adapterSelector.useSelectors(selector => selector.point)


	const handlerSubmitOrder = async (value: IInitialValues) => {
		try {
			dispatch(setOrderInfo(value))
			const request =  await dispatch(fetchOrderCart({
				organizationid: guid,
				address: value
			}) as any);

			/*
			const request = await RequestCart.OrderCheckCart({
				organizationid: guid,
				address: value
			})
			*/

			if (request.payload && request.payload.data) {
        if (typeof request.payload.data === 'string') {
          history.push(ROUTE_APP.ORDER_CREATE + '/' + request.payload.data)
        }
        
      }

	
		} catch (error: any) {
			console.log(error);
			

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