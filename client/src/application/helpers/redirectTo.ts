
import { IPoint } from "@types";
import { store } from "servises/redux/createStore";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";

export const Redirects = async (adress:IPoint) =>{
	//const {data} = await RequestAdmin.getBu({idorganization:id})
	if(adress.redirectON){
		window.location.href = `https://м.доставка.хинкалыч.рф/shop?organuzation=${adress.redirect}`
	}
}
