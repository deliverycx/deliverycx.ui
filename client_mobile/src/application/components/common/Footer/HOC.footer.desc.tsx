/* eslint-disable no-irregular-whitespace */
const HOCFooterDesc = () => {
	return (
		<div className="footer-desc">
			<div className="container">
				<div className="footer-desc_box">
					<div>
						<img src={require("assets/images/icons/footlogo.png")} alt="Старик Хинкалыч" />
					</div>
					
					<div className="foot_menu">
						<div className="foot_menu-title">О нас</div>
						<a className="foot_menu-item">Условия доставки</a>
						<a className="foot_menu-item">Калорийность и состав</a>
						<a className="foot_menu-item">Вакансии</a>
						<a className="foot_menu-item">Франшиза</a>
					</div>
					<div className="foot_menu">
						<div className="foot_menu-title">Контакты</div>
						<a className="foot_menu-item">Связаться с нами</a>
						<a className="foot_menu-item">Похвалить</a>
						<a className="foot_menu-item">Пожаловаться</a>
					</div>
					<div className="foot_info">
						<div className="foot_social-phone">+7 978 129-70-87</div>
						<div className="foot_social-social">
							<a href=""><img src={require("assets/images/icons/telegramfoot.png")} alt="tl" /></a>
							<a href=""><img src={require("assets/images/icons/footvk.png")} alt="vk" /></a>
						</div>
					</div>
				</div>
				<div className="footsub">
					<a href="">«Старик Хинкалыч» © 2016 — 2023</a>
					<svg width="1" height="16" viewBox="0 0 1 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M-6.9938e-07 16L0 -4.37112e-08L1 0L0.999999 16L-6.9938e-07 16Z" fill="white"/>
					</svg> 
					<a href="">Пользовательское соглашение</a>
					<svg width="1" height="16" viewBox="0 0 1 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M-6.9938e-07 16L0 -4.37112e-08L1 0L0.999999 16L-6.9938e-07 16Z" fill="white"/>
					</svg> 
					<a href="">Политика обработки персональных данных</a>
				</div>
			</div>
		</div>
	)
}
export default HOCFooterDesc