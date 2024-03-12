import { useEffect, useState } from 'react';
import axios from 'axios';
import { requestProfile } from 'modules/Profile/data/profile.request';
import { observable } from 'mobx';
import { userModel } from 'modules/UserModule/user.module';
import { observer } from 'mobx-react-lite';


const HOCLabyrinth = () => {
	const { guestUser } = userModel
	const [balanse, setBalanse] = useState<any>(null)

	const getBumerang = async (phone: string) => {
		try {
			const { data } = await requestProfile.getBumerang(phone)
			if (data && Array.isArray(data)) {
				data[0].balance && setBalanse(data[0].balance)
			}
		} catch (error) {

		}
	}

	useEffect(() => {
		if (guestUser && guestUser.phone) {
			getBumerang(guestUser.phone)
		}

	}, [guestUser])

	return (
		<>
			{
				balanse &&
				<div className="profile-content__gift">
					<div className="profile-content__gift-header">
						<h3>Получи дюжину хинкали в подарок!</h3>
						<button className="btn btn-none">
							<img src={require("assets/images/icons/info.png")} alt="" />
						</button>
					</div>

					<div className="profile-content__gift__content">
						{Array.from({ length: balanse.numberStampsTotal }, (_, i) => (
							<div className="profile-content__gift__content-item active">
								<svg key={i} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
									<path fillRule="evenodd" clipRule="evenodd" d="M34.4358 33.5747C30.5969 37.1692 25.0947 38.61 19.9725 38.61C14.8605 38.61 9.33632 37.1581 5.50929 33.5747C2.06728 30.3517 0.54493 24.5136 3.79265 20.5188C7.57358 15.8681 17.7571 14.5501 14.2622 6.30651C13.7977 5.21101 13.6947 3.89302 14.5783 3.08547C17.6207 0.304842 22.3244 0.304848 25.3668 3.08547C26.2504 3.89302 26.1474 5.21101 25.6829 6.30651C22.2463 14.4125 32.3335 15.8214 36.1524 20.5188C39.2185 24.2901 37.83 30.3963 34.4358 33.5747ZM19.9726 14.5368C18.3552 19.0978 18.3552 26.5637 19.9726 31.0811C21.5901 26.5637 21.5901 19.0978 19.9726 14.5368ZM15.9289 14.5174C17.8072 17.1657 15.5932 19.7845 13.3858 22.3956C11.7914 24.2815 10.2004 26.1633 10.1573 28.0493C8.36666 25.4721 10.5239 22.9025 12.6923 20.3198C14.3075 18.3959 15.9289 16.4646 15.9289 14.5174ZM24.0164 14.5174C22.138 17.1657 24.3521 19.7845 26.5595 22.3956C28.1539 24.2815 29.7449 26.1633 29.788 28.0493C31.5786 25.4721 29.4213 22.9025 27.253 20.3198C25.6378 18.3959 24.0164 16.4646 24.0164 14.5174Z" />
								</svg>
							</div>
						))}
						{Array.from({ length: balanse.stampsBeforeReward }, (_, i) => (
							<div className="profile-content__gift__content-item">
								<svg key={i} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
									<path fillRule="evenodd" clipRule="evenodd" d="M34.4358 33.5747C30.5969 37.1692 25.0947 38.61 19.9725 38.61C14.8605 38.61 9.33632 37.1581 5.50929 33.5747C2.06728 30.3517 0.54493 24.5136 3.79265 20.5188C7.57358 15.8681 17.7571 14.5501 14.2622 6.30651C13.7977 5.21101 13.6947 3.89302 14.5783 3.08547C17.6207 0.304842 22.3244 0.304848 25.3668 3.08547C26.2504 3.89302 26.1474 5.21101 25.6829 6.30651C22.2463 14.4125 32.3335 15.8214 36.1524 20.5188C39.2185 24.2901 37.83 30.3963 34.4358 33.5747ZM19.9726 14.5368C18.3552 19.0978 18.3552 26.5637 19.9726 31.0811C21.5901 26.5637 21.5901 19.0978 19.9726 14.5368ZM15.9289 14.5174C17.8072 17.1657 15.5932 19.7845 13.3858 22.3956C11.7914 24.2815 10.2004 26.1633 10.1573 28.0493C8.36666 25.4721 10.5239 22.9025 12.6923 20.3198C14.3075 18.3959 15.9289 16.4646 15.9289 14.5174ZM24.0164 14.5174C22.138 17.1657 24.3521 19.7845 26.5595 22.3956C28.1539 24.2815 29.7449 26.1633 29.788 28.0493C31.5786 25.4721 29.4213 22.9025 27.253 20.3198C25.6378 18.3959 24.0164 16.4646 24.0164 14.5174Z" />
								</svg>
							</div>
						))}
					</div>

					<div className="gift_info">
						<div className="gift_info-box">
							<span>до дюжины хинкали</span>
							<span className="gift_info-box-count">{balanse.stampsBeforeReward} штамов</span>	
						</div>
						<div className="gift_info-box">
							<span>подарочная дюжина</span>
							<span className="gift_info-box-count">{balanse.numberRewardsUnused} награды</span>	
						</div>
					</div>


				</div>
			}


		</>
	)
}
export default observer(HOCLabyrinth) 