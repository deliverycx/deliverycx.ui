import { cityModel } from 'modules/CityModule/city.module';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { appModel, appUseCase } from 'modules/AppModule/app.module';

const NotificatCity = () => {
	const city = cityModel.selectCity
	const youcitymodal = appModel.youcity
	const nf = appUseCase.youCityNotificate
	const navigate = useNavigate()
	const [modalnotif, setModalNotif] = useState(false)

	/*
	useEffect(() => {
		let tik: any
		if (city) {
			handleCity(true)
			tik = setTimeout(() => {
				handleCity(false)
			}, 300000)
		}

		return () => clearTimeout(tik)
	}, [city])
	*/

	const handleCity = (bol: boolean) => {
		nf(bol)
	}

	return (
		<>
			{
				youcitymodal &&
				<div className="notification_modal notification_city">
					<div className="notification_modal-container">
						<div className="notification-i"><svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 14L14 0L28 14H0Z" fill="black"  />
						</svg> </div>
						<div className="close" />
						<div className="you_city">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 21.625C11.8667 21.625 11.7333 21.6 11.6 21.55C11.4667 21.5 11.35 21.4333 11.25 21.35C8.81667 19.2 7 17.2042 5.8 15.3625C4.6 13.5208 4 11.8 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8 19.4 13.5208 18.2 15.3625C17 17.2042 15.1833 19.2 12.75 21.35C12.65 21.4333 12.5333 21.5 12.4 21.55C12.2667 21.6 12.1333 21.625 12 21.625Z" fill="#8D191D" />
							</svg>
							<div className="you_city-adress">
								<span>Ваш город - </span>
								<div className="you_city-adress--city"> {city?.cityname}</div>
							</div>
						</div>
						<div className="you_city-text">
							Покажем актуальное меню, условия доставки и акции ближайшего к тебе ресторана
						</div>
						<div className="notification_city__change">
							<div className="notification_city-btn-success" onClick={() => handleCity(false)}>Да, верно</div>
							<span className="notification_city-swap" onClick={() => {
								navigate(ROUTE_APP.CITY)
							}}>Выбрать другой</span>
						</div>
					</div>
				</div>
			}
		</>

	);
};
export default NotificatCity;