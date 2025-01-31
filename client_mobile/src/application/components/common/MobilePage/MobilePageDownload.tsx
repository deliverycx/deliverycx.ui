import { Mobile } from "application/ResponseMedia"
import TabBar from "../TabBar/TabBar"

const MobilePageDownload = () => {
	return (
		<Mobile>
			<div className="checkout pagedownload">
				<div className="order-accepted__content">
					<div className="order-accepted__content-sticker">
					</div>
					<div className="pagedownload_title">
						В приложении ещё удобнее
					</div>
					<p className="pagedownload_text"> Скачайте наше приложение на своё устройство и заказывайте свои любимые блюда ещё быстрее и удобнее</p>
				</div>
				<div className="appdowlod">
					<a href="https://apps.apple.com/ru/app/старик-хинкалыч/id6651860740"><img src={require('assets/images/icons/App_Store.png')} alt="" /></a>
					<a href="https://www.rustore.ru/catalog/app/com.deliverycx_mobile"><img src={require('assets/images/icons/ru_Store.png')} alt="" /></a>
				</div>

			</div>
			<TabBar />
		</Mobile>
	)
}
export default MobilePageDownload