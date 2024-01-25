import { ROUTE_APP } from "application/contstans/route.const"
import { useMediaRedirectPoint } from "application/hooks/useMediaRedirectPoint"
import { NavLink } from "react-router-dom"
import { observer } from 'mobx-react-lite';

const MainMenuDesc = () =>{
	const {redirectToDectPoints} = useMediaRedirectPoint()

	const shophandler = () =>{
		redirectToDectPoints()
		return ROUTE_APP.SHOP.SHOP_MAIN
	}

	const pointhandler = () =>{
		redirectToDectPoints()
		return ROUTE_APP.POINT
	}

	return(
		<div className="menu-desc">
			<NavLink to={shophandler()}>Меню</NavLink>
			<NavLink to="https://starikkhinkalich.ru/">Новости и акции</NavLink>
			<NavLink to={pointhandler()}>Старик Хинкалыч на карте</NavLink>
			<NavLink to="https://франшиза.хинкалыч.рф/">Франшиза</NavLink>
			<NavLink to="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform?pli=1">Вакансии</NavLink>
			
		</div>
	)
}
export default observer(MainMenuDesc) 