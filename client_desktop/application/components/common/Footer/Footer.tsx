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

  			</div>
  			<div className="foot">
  				<div className="foot-item">
  					<span>«Старик Хинкалыч» © 2022</span>
  				</div>
  				<div className="foot-item">
  					<a href="">Пользовательское соглашение</a>
  				</div>
  				<div className="foot-item">
  					<a href="">Политика обработки персональных данных</a>
  				</div>
  			</div>
  		</div>
  	</div>
  )
}
export default Footer
