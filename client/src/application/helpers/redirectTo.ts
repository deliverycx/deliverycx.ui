import { store } from "servises/redux/createStore";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";

export const Redirects = async (id:string) =>{
	const {data} = await RequestAdmin.getBu({idorganization:id})
	if(data.redirectON){
		//window.location.href = `https://%D0%BC%D0%BE%D0%B1.%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%B5%D1%80.%D1%85%D0%B8%D0%BD%D0%BA%D0%B0%D0%BB%D1%8B%D1%87.%D1%80%D1%84/shop?organuzation=${data.redirect}`
	}
}
