
import { store } from "servises/redux/createStore";
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";

export const Redirects = async (id:string) =>{
	const {data} = await RequestAdmin.getBu({idorganization:id})
	if(data.redirectON){
		window.location.href = `https://десктоп.хинкалыч.рф/shop?organuzation=${data.redirect}`
	}
}
