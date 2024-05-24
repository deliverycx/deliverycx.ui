import { observer } from "mobx-react-lite"
import { requestOrganizationAdmin } from "modules/OrganizationModule/Organization/data/organization.request"
import { organizationModel } from "modules/OrganizationModule/organization.module"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

/* eslint-disable no-irregular-whitespace */
const HOCFooterDesc = () => {
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

		point && FN()
	}, [])

	return (
		<div className="footer-desc">
			<div className="container">
				<div className="footer-desc_box">
					<div>
						<img src={require("assets/images/icons/footlogo.png")} alt="Старик Хинкалыч" />
					</div>
					
					<div className="foot_menu">
						<div className="foot_menu-title">О нас</div>
						<a href="https://starikkhinkalich.ru/doctavka" className="foot_menu-item">Условия доставки</a>
						<NavLink to="/docs/Старик_Хинкалыч_Калорийность_блюд_Осень_2023.pdf" target="_blank" className="foot_menu-item">Калорийность и состав</NavLink>
						<a href="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform?pli=1" className="foot_menu-item">Вакансии</a>
						<a href="https://франшиза.хинкалыч.рф/" className="foot_menu-item">Франшиза</a>
					</div>
					<div className="foot_menu">
						<div className="foot_menu-title">Контакты</div>
						<a href="#" className="foot_menu-item">Отдел рекламы</a>
						<a href="https://t.me/StarikHinkalichBot" className="foot_menu-item">Связаться с нами</a>
						<a href={like || ""} className="foot_menu-item">Похвалить</a>
						<a href="https://t.me/StarikHinkalichBot" className="foot_menu-item">Пожаловаться</a>
					</div>
					<div className="foot_info">
						<h3>{point && 
							<>
							<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.16699 2.0026C1.93088 2.0026 1.73296 1.92274 1.57324 1.76302C1.41352 1.6033 1.33366 1.40538 1.33366 1.16927C1.33366 0.93316 1.41352 0.735243 1.57324 0.575521C1.73296 0.415799 1.93088 0.335938 2.16699 0.335938H13.8337C14.0698 0.335938 14.2677 0.415799 14.4274 0.575521C14.5871 0.735243 14.667 0.93316 14.667 1.16927C14.667 1.40538 14.5871 1.6033 14.4274 1.76302C14.2677 1.92274 14.0698 2.0026 13.8337 2.0026H2.16699ZM2.16699 13.6693C1.93088 13.6693 1.73296 13.5894 1.57324 13.4297C1.41352 13.27 1.33366 13.072 1.33366 12.8359V8.66927H1.18783C0.923937 8.66927 0.708659 8.56858 0.541992 8.36719C0.375326 8.1658 0.31977 7.93316 0.375326 7.66927L1.20866 3.5026C1.25033 3.30816 1.34755 3.14844 1.50033 3.02344C1.6531 2.89844 1.82671 2.83594 2.02116 2.83594H13.9795C14.1739 2.83594 14.3475 2.89844 14.5003 3.02344C14.6531 3.14844 14.7503 3.30816 14.792 3.5026L15.6253 7.66927C15.6809 7.93316 15.6253 8.1658 15.4587 8.36719C15.292 8.56858 15.0767 8.66927 14.8128 8.66927H14.667V12.8359C14.667 13.072 14.5871 13.27 14.4274 13.4297C14.2677 13.5894 14.0698 13.6693 13.8337 13.6693C13.5975 13.6693 13.3996 13.5894 13.2399 13.4297C13.0802 13.27 13.0003 13.072 13.0003 12.8359V8.66927H9.66699V12.8359C9.66699 13.072 9.58713 13.27 9.42741 13.4297C9.26769 13.5894 9.06977 13.6693 8.83366 13.6693H2.16699ZM3.00033 12.0026H8.00033V8.66927H3.00033V12.0026Z" fill="white" />
</svg>   
							<span>{point.info.city},{point.info.address}</span>
							
							
							</>
							}</h3>
						<div  className="foot_social-phone">{point && point.info.phone}</div>
						<div className="foot_social-social">
							<a href="https://t.me/s/starikhinkalych"><img src={require("assets/images/icons/telegramfoot.png")} alt="tl" /></a>
							<a href="https://vk.com/starikhinkalych"><img src={require("assets/images/icons/footvk.png")} alt="vk" /></a>
						</div>
					</div>
				</div>
				<div className="footsub">
					<a href="/">«Старик Хинкалыч» © 2016 — 2023</a>
					<svg width="1" height="16" viewBox="0 0 1 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M-6.9938e-07 16L0 -4.37112e-08L1 0L0.999999 16L-6.9938e-07 16Z" fill="white"/>
					</svg> 
					<a href="/pravorazdel">Пользовательское соглашение</a>
					<svg width="1" height="16" viewBox="0 0 1 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M-6.9938e-07 16L0 -4.37112e-08L1 0L0.999999 16L-6.9938e-07 16Z" fill="white"/>
					</svg> 
					<a href="/pravorazdel">Политика обработки персональных данных</a>
				</div>
			</div>
		</div>
	)
}
export default observer(HOCFooterDesc) 