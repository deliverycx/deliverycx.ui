import { ROUTE_APP } from "application/contstans/route.const"
import { NavLink } from "react-router-dom"

const MainMenuDesc = () =>{
	return(
		<div className="menu-desc">
			<NavLink className="active" to={ROUTE_APP.PROFILE.PROFILE_ADRESS}>Меню</NavLink>
			<NavLink to={ROUTE_APP.PROFILE.PROFILE_ADRESS}>Новости и акции</NavLink>
			<NavLink to={ROUTE_APP.PROFILE.PROFILE_ADRESS}>Контакты</NavLink>
			<NavLink to={ROUTE_APP.PROFILE.PROFILE_ADRESS}>Забронировать столик</NavLink>
			<NavLink to={ROUTE_APP.PROFILE.PROFILE_ADRESS}>Вакансии</NavLink>
			<NavLink to={ROUTE_APP.PROFILE.PROFILE_ADRESS}>Франшиза</NavLink>
		</div>
	)
}
export default MainMenuDesc