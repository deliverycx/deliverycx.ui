import { NavLink, useNavigate } from "react-router-dom"
import { ROUTE_APP } from 'application/contstans/route.const';
import ModalCard from "../../Modals/ModalCard";
import { FC, useState } from "react";
import TabBar from "../../TabBar/TabBar";


/* eslint-disable no-irregular-whitespace */



const OfferAuth = () => {
	const navigate = useNavigate()

	return (
		<div className="basket auth-block">
			<div className="top-bar">
				<div className="top-bar__left">
					<div className="top-bar__icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#8D191D" /></svg>
					</div>
					<h3>Авторизация</h3>

				</div>
			</div>
			<div className="unauthorized__content">
				<div className="unauthorized__content-sticker">
					<img src={require("assets/images/delivery/unauthorized.png")} alt="Весёлый хинкалик" />
				</div>
				<div className="unauthorized__content-title">Вы не авторизованы</div>
				<div className="unauthorized__content-text">
					Для доступа к сохранённым адресам доставки и истории заказов, необходимо войти в свой профиль
				</div>
				<div className="unauthorized__buttons">
				<NavLink to={ROUTE_APP.AUTH.REGISTER} className="btn btn-md btn-red">Войти</NavLink>
			</div>	
			</div>
			
			<TabBar />
		</div>

	)
}
export default OfferAuth