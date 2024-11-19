import { Desktop, Mobile } from "application/ResponseMedia";
import LayoutDesctop from "../Layout/LayoutDesctop";

const ErrorPage = () => {
	return <>
		<Desktop>
			<LayoutDesctop>
				<div className="checkout">
					<div className="order-accepted__content">
						<div className="order-accepted__content-sticker">
							<img
								src={require('assets/images/delivery/no_addresses.png')}
								alt="Весёлый хинкалик"
							/>
						</div>
						<div className="order-accepted__content-title">
							Технические неполадки
						</div>

					</div>

				</div>
			</LayoutDesctop>
		</Desktop>
		<Mobile>
			<div className="checkout">
				<div className="order-accepted__content">
					<div className="order-accepted__content-sticker">
						<img
							src={require('assets/images/delivery/no_addresses.png')}
							alt="Весёлый хинкалик"
						/>
					</div>
					<div className="order-accepted__content-title">
						Технические неполадки
					</div>
				</div>

			</div>
		</Mobile>
	</>;
};
export default ErrorPage;
