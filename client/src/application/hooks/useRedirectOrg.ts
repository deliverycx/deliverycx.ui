import { ROUTE_APP } from "application/contstans/route.const";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setCiti, setPoint } from "servises/redux/slice/locationSlice";
import RequestLocation from "servises/repository/Axios/Request/Request.Location";
import { router } from "yandex-maps";

export const useRedirectOrg = () =>{
	const dispatch = useDispatch()
	const loc = useLocation()
	const query = new URLSearchParams(loc.search);
	const organuzation = query.get('organuzation')

	useEffect(()=>{
		organuzation && byOrg(organuzation)
	},[organuzation])

	const byOrg = async (org:string) =>{
		
		try {
			const {data}:any = await RequestLocation.geBuOrg(org)
			if(data){
				const res = await RequestLocation.geBuCity(data.cityid._id)
				if(res.status === 200){
					dispatch(setCiti(res.data));
					dispatch(setPoint(data));
					
				}
				
			}else{
				window.location.href = process.env.REACT_APP_REDIRECT as string
			}
		} catch (error) {
			window.location.href = process.env.REACT_APP_REDIRECT as string
		}
	}
	

	return []
}