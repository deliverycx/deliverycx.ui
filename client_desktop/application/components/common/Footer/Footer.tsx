import FooterLocation from "./FooterLocation";

const Footer = () => {
  return (
    <div className="footer">
  		<div className="container">
  			<div className="footer_grid">
  				<div className="footer_grid-left">
  					<div className="footer_box">
  						<div className="footer_box-title">О нас</div>
  						<a className="footer_box-link" href="https://docs.google.com/forms/d/e/1FAIpQLScF_kqRIOC4YtZGJnravy94pIEbzlmW4MM3IWhR_tBGLqcQ0g/viewform" target="_blank" rel="noreferrer">Работа в Старик Хинкалыч</a>
  						<a className="footer_box-link" href="https://франшиза.хинкалыч.рф/" target="_blank" rel="noreferrer">Франчайзинг</a>
						<a href="https://t.me/franchise_hinkalych" target="_blank" rel="noreferrer">
							<img className="tg" src="/images/icon/tg-plane.png" alt=""/>
						</a>
  					</div>
  					<div className="footer_box">
                        <FooterLocation/>
  					</div>
  				</div>
				<div className="footer_grid-form">
					<div className="footer_form-title">Подписывайтесь на рассылку</div>
					<form>
						<input type="email" placeholder="Введите адрес эл. почты" className="email-input"/>
						<button type="button" className="form-button">Подписаться</button>
						<div className="form-checkbox-container">
							<input type="checkbox" id="check" className="check"/>
							<label htmlFor="check" className="checkbox">
								<div className="mark"></div>
							</label>
							<label htmlFor="check">Соглашаюсь на обработку персональных данных <span>*</span></label>
						</div>
						<div className='footer_form-agreement'>
							<div><span>*</span>Настоящим я свободно, своей волей и в своём интересе даю согласие на то что...</div>
							<a href="#">Показать соглашение</a>
						</div>
					</form>
				</div>
  			</div>
  			<div className="foot">
  				<div className="foot-item">
  					<span>«Старик Хинкалыч» © 2022</span>
  				</div>
  				<div className="foot-item">
  					<a href="">Пользовательское соглашение</a>
  				</div>
  				<div className="foot-item">
  					<a href="#">Политика обработки персональных данных</a>
  				</div>
  			</div>
  		</div>
  	</div>
  )
}
export default Footer
