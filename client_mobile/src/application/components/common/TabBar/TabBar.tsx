/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { CATALOGUE_ROUTE, BASKET_ROUTE, AUTH_ROUTE, PROFILE_ROUTE } from "utils/consts"
import MainMenu from "../Menu/MainMenu"
import { ROUTE_APP } from "application/contstans/route.const"
import { basketModel } from "modules/BasketModule/basket.module"
import { observer } from "mobx-react-lite"
import { profileModel } from "modules/Profile/profile.module"
import { userModel } from "modules/UserModule/user.module"
import cn from "classnames"
import {
	requestOrganizationAdmin
} from "../../../../modules/OrganizationModule/Organization/data/organization.request";
import { organizationModel } from "../../../../modules/OrganizationModule/organization.module";

const TabBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const user = userModel.guestUser
	const cartprice = basketModel.basketPrice
	const point = organizationModel.selectOrganization
	const [like, setLike] = useState<string>()

	useEffect(() => {
		const FN = async () => {
			try {
				const res = await requestOrganizationAdmin.socialBu(point?.guid)
				setLike(res?.data?.like)
			} catch (e) {
				console.log(e, 'like error or nothing');
			}
		}

		FN()
	}, [])

	const scroll = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	const CNCART = cn('tab-bar__link value',{tabcart_disable:basketModel.basketPrice && basketModel.basketPrice.fullPrice === 0})

	return (
		<>
			<nav className="tab-bar">
				<ul className="tab-bar__list">
					<li className="tab-bar__item">
						<NavLink onClick={scroll} to={ROUTE_APP.SHOP.SHOP_MAIN} className="tab-bar__link">
							<div className="tab-bar__img">
								<svg className="tab-bar__img-home" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM6 21C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19V10C4 9.68333 4.07083 9.38333 4.2125 9.1C4.35417 8.81667 4.55 8.58333 4.8 8.4L10.8 3.9C10.9833 3.76667 11.175 3.66667 11.375 3.6C11.575 3.53333 11.7833 3.5 12 3.5C12.2167 3.5 12.425 3.53333 12.625 3.6C12.825 3.66667 13.0167 3.76667 13.2 3.9L19.2 8.4C19.45 8.58333 19.6458 8.81667 19.7875 9.1C19.9292 9.38333 20 9.68333 20 10V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H13V15H11V21H6Z" />
								</svg>
							</div>
							Главная
						</NavLink>
					</li>
					{
						basketModel?.basketPrice?.fullPrice === 0 ? (
							<li className="tab-bar__item">
								<div className={CNCART}>
									<div className="tab-bar__img">
										<svg className="tab-bar__img-basket" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M5.00009 21C4.71675 21 4.45842 20.9125 4.22509 20.7375C3.99175 20.5625 3.83342 20.3333 3.75009 20.05L0.950086 9.95C0.866753 9.71667 0.904253 9.5 1.06259 9.3C1.22092 9.1 1.43342 9 1.70009 9H6.75009L11.1501 2.45C11.2334 2.31667 11.3501 2.20833 11.5001 2.125C11.6501 2.04167 11.8084 2 11.9751 2C12.1418 2 12.3001 2.04167 12.4501 2.125C12.6001 2.20833 12.7168 2.31667 12.8001 2.45L17.2001 9H22.3001C22.5668 9 22.7793 9.1 22.9376 9.3C23.0959 9.5 23.1334 9.71667 23.0501 9.95L20.2501 20.05C20.1668 20.3333 20.0084 20.5625 19.7751 20.7375C19.5418 20.9125 19.2834 21 19.0001 21H5.00009ZM5.50009 19H18.5001L20.7001 11H3.30009L5.50009 19ZM12.0001 17C12.5501 17 13.0209 16.8042 13.4126 16.4125C13.8043 16.0208 14.0001 15.55 14.0001 15C14.0001 14.45 13.8043 13.9792 13.4126 13.5875C13.0209 13.1958 12.5501 13 12.0001 13C11.4501 13 10.9793 13.1958 10.5876 13.5875C10.1959 13.9792 10.0001 14.45 10.0001 15C10.0001 15.55 10.1959 16.0208 10.5876 16.4125C10.9793 16.8042 11.4501 17 12.0001 17ZM9.17509 9H14.8001L11.9751 4.8L9.17509 9Z" />
										</svg>
										{
											(cartprice && cartprice.fullPrice !== 0) &&
											<div className="tab-bar__img-value">
												{cartprice.fullPrice} ₽
											</div>
										}

									</div>
									Корзина
								</div>
							</li>
						) : (
							<li className="tab-bar__item">
								<NavLink to={ROUTE_APP.CART.BASKET_MAIN} className={CNCART}>
									<div className="tab-bar__img">
										<svg className="tab-bar__img-basket" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M5.00009 21C4.71675 21 4.45842 20.9125 4.22509 20.7375C3.99175 20.5625 3.83342 20.3333 3.75009 20.05L0.950086 9.95C0.866753 9.71667 0.904253 9.5 1.06259 9.3C1.22092 9.1 1.43342 9 1.70009 9H6.75009L11.1501 2.45C11.2334 2.31667 11.3501 2.20833 11.5001 2.125C11.6501 2.04167 11.8084 2 11.9751 2C12.1418 2 12.3001 2.04167 12.4501 2.125C12.6001 2.20833 12.7168 2.31667 12.8001 2.45L17.2001 9H22.3001C22.5668 9 22.7793 9.1 22.9376 9.3C23.0959 9.5 23.1334 9.71667 23.0501 9.95L20.2501 20.05C20.1668 20.3333 20.0084 20.5625 19.7751 20.7375C19.5418 20.9125 19.2834 21 19.0001 21H5.00009ZM5.50009 19H18.5001L20.7001 11H3.30009L5.50009 19ZM12.0001 17C12.5501 17 13.0209 16.8042 13.4126 16.4125C13.8043 16.0208 14.0001 15.55 14.0001 15C14.0001 14.45 13.8043 13.9792 13.4126 13.5875C13.0209 13.1958 12.5501 13 12.0001 13C11.4501 13 10.9793 13.1958 10.5876 13.5875C10.1959 13.9792 10.0001 14.45 10.0001 15C10.0001 15.55 10.1959 16.0208 10.5876 16.4125C10.9793 16.8042 11.4501 17 12.0001 17ZM9.17509 9H14.8001L11.9751 4.8L9.17509 9Z" />
										</svg>
										{
											(cartprice && cartprice.fullPrice !== 0) &&
											<div className="tab-bar__img-value">
												{cartprice.fullPrice} ₽
											</div>
										}

									</div>
									Корзина
								</NavLink>
							</li>
						)
					}
					<li className="tab-bar__item">
						{user && user.phone ? (
							<NavLink to={ROUTE_APP.PROFILE.PROFILE_MAIN} className="tab-bar__link">
								<div className="tab-bar__img">
									<svg className="tab-bar__img-profile" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" />
									</svg>
								</div>
								Профиль
							</NavLink>
						) : (
							<NavLink to={ROUTE_APP.AUTH.AUTORIZATE} className="tab-bar__link">
								<div className="tab-bar__img">
									<svg className="tab-bar__img-profile" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" />
									</svg>
								</div>
								Войти
							</NavLink>


						)}
					</li>
					<li className="tab-bar__item">
						<button onClick={() => setIsMenuOpen(prevState => !prevState)} className="tab-bar__link">
							<div className="tab-bar__img">
								<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17C3 16.7167 3.09583 16.4792 3.2875 16.2875C3.47917 16.0958 3.71667 16 4 16H20C20.2833 16 20.5208 16.0958 20.7125 16.2875C20.9042 16.4792 21 16.7167 21 17C21 17.2833 20.9042 17.5208 20.7125 17.7125C20.5208 17.9042 20.2833 18 20 18H4ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47917 7.90417 3.2875 7.7125C3.09583 7.52083 3 7.28333 3 7C3 6.71667 3.09583 6.47917 3.2875 6.2875C3.47917 6.09583 3.71667 6 4 6H20C20.2833 6 20.5208 6.09583 20.7125 6.2875C20.9042 6.47917 21 6.71667 21 7C21 7.28333 20.9042 7.52083 20.7125 7.7125C20.5208 7.90417 20.2833 8 20 8H4Z" />
								</svg>
							</div>
							Меню
						</button>
					</li>
				</ul>
			</nav>
			{isMenuOpen && (
				<MainMenu closeMenu={setIsMenuOpen} like={like} />
			)}
		</>
	)
}
export default observer(TabBar)