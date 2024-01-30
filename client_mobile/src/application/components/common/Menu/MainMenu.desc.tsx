import { ROUTE_APP } from "application/contstans/route.const"
import { useMediaRedirectPoint } from "application/hooks/useMediaRedirectPoint"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { observer } from 'mobx-react-lite';
import cn from 'classnames'

const MainMenuDesc = () =>{
	const navigate = useNavigate()
	const params = useLocation()
	const {redirectToDectPoints} = useMediaRedirectPoint()

	const shophandler = () =>{
		const p = redirectToDectPoints()
		p &&  navigate(ROUTE_APP.SHOP.SHOP_MAIN)
	}

	const pointhandler = () =>{
		const p = redirectToDectPoints()
		p &&  navigate(ROUTE_APP.POINT)
	}

	const CNSHOP = cn('',{active:params.pathname == ROUTE_APP.SHOP.SHOP_MAIN})
	const CNPoint = cn('',{active:params.pathname == ROUTE_APP.POINT})

	return(
		<div className="menu-desc">
			<a className={CNSHOP} onClick={shophandler}>Меню</a>
			<NavLink to="https://starikkhinkalich.ru/">Новости и акции</NavLink>
			<a className={CNPoint} onClick={pointhandler}>Старик Хинкалыч на карте</a>
			<NavLink to="https://франшиза.хинкалыч.рф/">Франшиза</NavLink>
			<NavLink to="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform?pli=1">Вакансии</NavLink>
			
		</div>
	)
}
export default observer(MainMenuDesc) 