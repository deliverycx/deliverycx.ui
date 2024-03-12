import TabBar from "application/components/common/TabBar/TabBar"
import { NavLink } from "react-router-dom"
import { PERSONAL_ROUTE, DELIVERYADDRESSES_ROUTE, ORDERS_ROUTE } from "utils/consts"
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useProfileViewModel } from "./Profile.viewModel";
import { ROUTE_APP } from "application/contstans/route.const";
import { observer } from 'mobx-react-lite';
import HOCLabyrinth from "./Labyrinth/HOC.Labyrinth";

const HOCProfile = () => {
	const useCase = adapterComponentUseCase(useProfileViewModel)
	const {profile,user} = useCase.data
	const {logout} = useCase.handlers

	return (
		<>
			<div className="profile">
				<div className="top-bar">
					<div className="top-bar__left">
						<div className="top-bar__icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#8D191D" /></svg>
						</div>
						<h3>Профиль</h3>
					</div>
				</div>
				{
					profile && user &&
					<div className="profile-content">
					<div className="profile-content__info">
						<h2 className="profile-content__info-name">{profile.personal && profile.personal.name ? profile.personal.name : <a href={ROUTE_APP.PROFILE.PROFILE_PERSONAL}>Добавить имя</a> } </h2>
						<h4 className="profile-content__info-numb">{user.phone}</h4>
					</div>
					<HOCLabyrinth />
					<div className="profile-content__list">
						<NavLink to={ROUTE_APP.PROFILE.PROFILE_PERSONAL} className="profile-content__list-link">
							Личные данные
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M9.29006 15.88L13.1701 12L9.29006 8.11998C8.90006 7.72998 8.90006 7.09998 9.29006 6.70998C9.68006 6.31998 10.3101 6.31998 10.7001 6.70998L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" fill="#8D191D" />
							</svg>
						</NavLink>
						<NavLink to={ROUTE_APP.PROFILE.PROFILE_ADRESS} className="profile-content__list-link">
							Адреса доставки
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M9.29006 15.88L13.1701 12L9.29006 8.11998C8.90006 7.72998 8.90006 7.09998 9.29006 6.70998C9.68006 6.31998 10.3101 6.31998 10.7001 6.70998L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" fill="#8D191D" />
							</svg>
						</NavLink>
						<NavLink to={ROUTE_APP.PROFILE.PROFILE_ORDERS} className="profile-content__list-link">
							Заказы
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M9.29006 15.88L13.1701 12L9.29006 8.11998C8.90006 7.72998 8.90006 7.09998 9.29006 6.70998C9.68006 6.31998 10.3101 6.31998 10.7001 6.70998L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" fill="#8D191D" />
							</svg>
						</NavLink>
					</div>
				</div>
				}

				<div className="profile__button">
					<button  className="btn btn-none btn-none-defualt" onClick={logout}>
						<img src={require("assets/images/icons/logout.png")} alt="" />
						Выйти из аккаунта
					</button>
				</div>
				<TabBar />
			</div>
		</>
	)
}
export default observer(HOCProfile) 