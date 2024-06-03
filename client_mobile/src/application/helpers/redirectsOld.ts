export const Redirects = async (adress:any) =>{
	//const {data} = await RequestAdmin.getBu({idorganization:id})
//console.log(adress.redirectON);
	if(adress.redirectON){
		
		window.location.href = `https://м.доставка.хинкалыч.рф/shop?organuzation=${adress.redirectUrl}`
	}
}