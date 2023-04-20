import { QUERY_APP, ROUTE_APP } from "application/contstans/route.const";
import { setOrderType, fetchDeleteCart } from "servises/redux/slice/cartSlice";
import { setCiti, setPoint } from "servises/redux/slice/locationSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { RequestLocation } from "servises/repository/Axios/Request";

export const useRedirectOrg = () =>{
	const dispatch = useDispatch()
	const loc = useLocation()
	const history = useHistory();
	
	//http://localhost:3000/shop?organuzation=11663d0f-51a6-419d-8814-d3cb180eeab4&table={%22id%22:%22123%22,%22numb%22:2}&delivMetod=ONSPOT
	const query = new URLSearchParams(loc.search);
	const organuzation = query.get(QUERY_APP.ORGANIZATION)
	const table = query.get(QUERY_APP.ONSPOT_TABLE)
	const delivMetod = query.get(QUERY_APP.DELIVERY_METOD)

	useEffect(()=>{
		organuzation && caseQuery()
	},[organuzation])

	const caseQuery = async () =>{
		if(organuzation){
			await byOrg(organuzation)
		}
		if(delivMetod){
			dispatch(setOrderType(delivMetod))
		}
	}

	const byOrg = async (org:string) =>{
		
		try {
			
			const {data}:any = await RequestLocation.geBuOrg(org)
			
			if(data){
				const res = await RequestLocation.geBuCity(data.cityid._id)
				if(res.status === 200){
					dispatch(setCiti(res.data));
					dispatch(setPoint(data));
					dispatch(fetchDeleteCart())
					history.push(ROUTE_APP.SHOP.SHOP_MAIN)
				}
				
			}else{
				//window.location.href = process.env.REACT_APP_REDIRECT as string
			}
		} catch (error) {
			//window.location.href = process.env.REACT_APP_REDIRECT as string
		}
	}

	return []
}