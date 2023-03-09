import { RequestAdmin } from "servises/repository/Axios/RequestAdmin"


export const Redirects = async (id:string) =>{
	const {data} = await RequestAdmin.getBu({idorganization:id})
	if(data.redirectON){
		window.location.href = `https://трансфер.хинкалыч.рф/?organuzation=${data.redirect}`
	}
}