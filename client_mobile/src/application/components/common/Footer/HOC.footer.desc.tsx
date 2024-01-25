import { observer } from "mobx-react-lite"
import { requestOrganizationAdmin } from "modules/OrganizationModule/Organization/data/organization.request"
import { organizationModel } from "modules/OrganizationModule/organization.module"
import { useState, useEffect } from "react"

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
						
						<a href="/docs/Старик_Хинкалыч_Калорийность_блюд_Осень_2023.pdf" className="foot_menu-item">Калорийность и состав</a>
						<a href="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform?pli=1" className="foot_menu-item">Вакансии</a>
						<a href="https://франшиза.хинкалыч.рф/" className="foot_menu-item">Франшиза</a>
					</div>
					<div className="foot_menu">
						<div className="foot_menu-title">Контакты</div>
						<a href="https://t.me/StarikHinkalichBot" className="foot_menu-item">Связаться с нами</a>
						<a href={like || ""} className="foot_menu-item">Похвалить</a>
						<a href="https://t.me/StarikHinkalichBot" className="foot_menu-item">Пожаловаться</a>
					</div>
					<div className="foot_info">
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