import { Desktop, Mobile } from "application/ResponseMedia";
import LayoutDesctop from "../Layout/LayoutDesctop";
import { useState } from "react";

const ErrorPage = () => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false)
	return <>
		<Desktop>
			<LayoutDesctop>
				<div className="checkout">
					<div className="order-accepted__content">
						<div className="order-accepted__content-sticker">
							<img
								src={isHovered ? require('assets/images/cry.gif') : require('assets/images/delivery/no_addresses.png')}
								alt="Hover example"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								style={{ cursor: 'pointer', transition: '0.3s ease-in-out' }} // Для плавности (опционально)
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
							src={isHovered ? require('assets/images/cry.gif') : require('assets/images/delivery/no_addresses.png')}
							alt="Hover example"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							style={{ cursor: 'pointer', transition: '0.3s ease-in-out' }} // Для плавности (опционально)
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
