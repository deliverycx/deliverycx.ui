import { adapterComponentUseCase } from "adapters/adapterComponents"
import LayoutDesctop from "application/components/common/Layout/LayoutDesctop"
import { useProfileViewModel } from "./Profile.viewModel"
import { ROUTE_APP } from "application/contstans/route.const"
import HOCDeliveryAdress from "./DeliveryAdress/HOC.DeliveryAdress"
import HOCDeliveryAdressDesc from "./DeliveryAdress/HOC.DeliveryAdress.desc"

const HOCProfileDesc = () => {
	const useCase = adapterComponentUseCase(useProfileViewModel)
	const { profile, user } = useCase.data
	const { logout } = useCase.handlers

	return (
		<LayoutDesctop>
			<div className="profile-desc">
				<div className="profile-desc-left">
					<div className="profile-desc_personal-box profile-desc_box">
						<div className="profile-desc_box-title">
							<div className="box-title_img">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#8D191D" />
								</svg>
							</div>
							<div className="box-title_title">Личные данные</div>
						</div>
						<div className="personal-box">
							<div className="personal-box_title">{profile.personal && profile.personal.name ? profile.personal.name : <a href={ROUTE_APP.PROFILE.PROFILE_PERSONAL}>Добавить имя</a>}</div>
							<div className="personal-box_phone">{user.phone}</div>
						</div>
						<a href={ROUTE_APP.PROFILE.PROFILE_PERSONAL} className="profile-desc_box_imgbutton">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9125 3.075 16.7875C3.125 16.6625 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.3375 20.875 7.2125 20.925C7.0875 20.975 6.95833 21 6.825 21H4ZM14.325 9.675L13.625 8.975L15.025 10.375L14.325 9.675Z" fill="#8D191D" />
							</svg> <span>Изменить данные</span>
						</a>
						<button onClick={logout} className="profile-desc_box_imgbutton">
							<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.825 16.275C15.6417 16.0583 15.55 15.8125 15.55 15.5375C15.55 15.2625 15.6417 15.0333 15.825 14.85L17.675 13H10.5C10.2167 13 9.97917 12.9042 9.7875 12.7125C9.59583 12.5208 9.5 12.2833 9.5 12C9.5 11.7167 9.59583 11.4792 9.7875 11.2875C9.97917 11.0958 10.2167 11 10.5 11H17.675L15.825 9.15C15.625 8.95 15.525 8.7125 15.525 8.4375C15.525 8.1625 15.625 7.925 15.825 7.725C16.0083 7.525 16.2375 7.425 16.5125 7.425C16.7875 7.425 17.0167 7.51667 17.2 7.7L20.8 11.3C20.9 11.4 20.9708 11.5083 21.0125 11.625C21.0542 11.7417 21.075 11.8667 21.075 12C21.075 12.1333 21.0542 12.2583 21.0125 12.375C20.9708 12.4917 20.9 12.6 20.8 12.7L17.2 16.3C16.9833 16.5167 16.7458 16.6125 16.4875 16.5875C16.2292 16.5625 16.0083 16.4583 15.825 16.275ZM5.5 21C4.95 21 4.47917 20.8042 4.0875 20.4125C3.69583 20.0208 3.5 19.55 3.5 19V5C3.5 4.45 3.69583 3.97917 4.0875 3.5875C4.47917 3.19583 4.95 3 5.5 3H11.5C11.7833 3 12.0208 3.09583 12.2125 3.2875C12.4042 3.47917 12.5 3.71667 12.5 4C12.5 4.28333 12.4042 4.52083 12.2125 4.7125C12.0208 4.90417 11.7833 5 11.5 5H5.5V19H11.5C11.7833 19 12.0208 19.0958 12.2125 19.2875C12.4042 19.4792 12.5 19.7167 12.5 20C12.5 20.2833 12.4042 20.5208 12.2125 20.7125C12.0208 20.9042 11.7833 21 11.5 21H5.5Z" fill="#8D191D" />
							</svg>  <span>Выйти из аккаунта</span>
						</button>
					</div>


					<div className="profile-desc_personal-box profile-desc_box">
						<div className="profile-desc_box-title">
							<div className="box-title_img">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#8D191D" />
								</svg>
							</div>
							<div className="box-title_title">Личные данные</div>
						</div>
						<div className="personal-box">
							<HOCDeliveryAdressDesc />
						</div>
						</div>


				</div>
				<div className="profile-desc-right">

				</div>

			</div>
		</LayoutDesctop>
	)
}
export default HOCProfileDesc