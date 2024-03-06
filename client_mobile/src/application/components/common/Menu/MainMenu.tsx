/* eslint-disable no-constant-condition */
import React, { FC, useContext, useEffect, useRef } from 'react';

import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import iconPerson from "assets/images/icons/person.png";
import iconLocation from "assets/images/icons/location.png";
import iconListAlt from "assets/images/icons/list_alt.png";
import iconStoreGray from "assets/images/icons/store_gray.png";
import iconTableRestaurantGray from "assets/images/icons/table_restaurant_gray.png";
import iconThumbUp from "assets/images/icons/thumb_up.png";
import iconThumbDown from "assets/images/icons/thumb_down.png";
import iconWork from "assets/images/icons/work.png";
import iconHandshake from "assets/images/icons/handshake.png";
import iconChat from "assets/images/icons/chat.png";
import iconClose from "assets/images/icons/close.png";
import iconVk from "assets/images/icons/vk.png";
import iconTg from "assets/images/icons/telegram.png";
import { ROUTE_APP } from 'application/contstans/route.const';
import { userModel } from 'modules/UserModule/user.module';
import { organizationModel } from 'modules/OrganizationModule/organization.module';


const MainMenu: FC<{ closeMenu: any, like: string | any }> = observer(({ closeMenu, like }) => {
	const point = organizationModel.selectOrganization
	const user = userModel.guestUser
	

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const menuRef = useRef<any>()
	useEffect(() => {
		setTimeout(() => {
			menuRef.current.classList.add('opened')
		}, 50)
	}, [menuRef])
	const handleClose = () => {
		menuRef.current.classList.remove('opened')
		setTimeout(() => {
			closeMenu(false)
		}, 300)
	}
	const handleWrapperClick = (e: any) => {
		if (e.target.classList.contains('menu-wrapper')) {
			menuRef.current.classList.remove('opened')
			setTimeout(() => {
				closeMenu(false)
			}, 300)
		}

	}

	return (
		<div className="menu-wrapper" onClick={(e) => handleWrapperClick(e)}>
			<div ref={menuRef} className="menu">
				<div className="menu-header">
					<button onClick={handleClose}>
						<img src={iconClose} alt="" />
					</button>
				</div>
				<div className="menu-menu">
					{user && user.phone ? (
						<>
							<NavLink to={ROUTE_APP.PROFILE.PROFILE_MAIN}>
								<img src={iconPerson} alt="" />
								Профиль
							</NavLink>
							<NavLink to={ROUTE_APP.PROFILE.PROFILE_ADRESS}>
								<img src={iconLocation} alt="" />
								Адреса доставки
							</NavLink>
							<NavLink to={ROUTE_APP.PROFILE.PROFILE_ORDERS}>
								<img src={iconListAlt} alt="" />
								Заказы
							</NavLink>
						</>


					) : (
						<NavLink to={ROUTE_APP.AUTH.REGISTER}>
							<img src={iconPerson} alt="" />
							Войти в	профиль
						</NavLink>
					)}

					<NavLink to={ROUTE_APP.MAIN}>
						<img src={iconStoreGray} alt="" />
						<span>
							{point?.info.city}
							<span>{point?.info.address}</span>
						</span>
					</NavLink>

					{
						like ? (
							<NavLink to={like} target="_blank">
								<img src={iconThumbUp} alt="" />
								Похвалить
							</NavLink>
						) : (
							<NavLink to="">
								<img src={iconThumbUp} alt="" />
								Похвалить
							</NavLink>
						)
					}

					<NavLink to="https://t.me/StarikHinkalichBot">
						<img src={iconThumbDown} alt="" />
						Пожаловаться
					</NavLink>
					<NavLink to="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform?pli=1">
						<img src={iconWork} alt="" />
						Вакансии
					</NavLink>
					<NavLink to="https://франшиза.хинкалыч.рф/">
						<img src={iconHandshake} alt="" />
						Франшиза
					</NavLink>
					<NavLink to="https://t.me/StarikHinkalichBot" target="_blank">
						<img src={iconChat} alt="" />
						Связаться с нами
					</NavLink>
				</div>
				<div className="menu-social">
					<NavLink to="https://vk.com/starikhinkalych" target="_blank">
						<img src={iconVk} alt="" />
					</NavLink>
					<NavLink to="https://t.me/s/starikhinkalych" target="_blank">
						<img src={iconTg} alt="" />
					</NavLink>
				</div>
				<NavLink to="/pravorazdel" className="menu-full-link">
					Правовой раздел
				</NavLink>
				<a href="/docs/СтарикХинкалычКалорийностьблюд.pdf" target='_blank' className="menu-full-link">
					Калорийность и состав
				</a>
			</div>
		</div>
	);
});

export default MainMenu;