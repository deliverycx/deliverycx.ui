/* eslint-disable @typescript-eslint/no-var-requires */
import { ROUTE_APP } from "application/contstans/route.const"
import { basketModel } from "modules/BasketModule/basket.module"
import { requestOrganizationAdmin } from "modules/OrganizationModule/Organization/data/organization.request"
import { organizationModel } from "modules/OrganizationModule/organization.module"
import { userModel } from "modules/UserModule/user.module"
import { useState, useEffect, FC } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import MainMenuDesc from "../Menu/MainMenu.desc"
import { observer } from "mobx-react-lite"

const HOCdescHead:FC<{styles?:string}> = ({styles}) => {
	const point = organizationModel.selectOrganization
	const user = userModel.guestUser
	const cartprice = basketModel.basketPrice
	const navigate = useNavigate()

	

	const [goodPlaceId, setGoodPlaceId] = useState<string>('')

	useEffect(() => {
		const getGoodPlaceId = async (id: string) => {
			try {
				const { data } = await requestOrganizationAdmin.getByOrganizationGoodPlaceId(id)
				setGoodPlaceId(data.goodplaceid)
			} catch (error) {
				console.log(error);
			}
		}

		point && getGoodPlaceId(point.guid)
	}, [point])

	return (
		<>
		<div className={`head-desc ${styles}`}>
			
			<section>
				<img src={require("assets/images/logo.svg").default} alt="Старик Хинкалыч" />
				{
					point &&
					<>
						<div className="head_point">
							<div className="head_point-adress" onClick={()=> navigate(ROUTE_APP.POINT)}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4.99995 6C4.71662 6 4.47912 5.90417 4.28745 5.7125C4.09578 5.52083 3.99995 5.28333 3.99995 5C3.99995 4.71667 4.09578 4.47917 4.28745 4.2875C4.47912 4.09583 4.71662 4 4.99995 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9041 4.47917 20 4.71667 20 5C20 5.28333 19.9041 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6H4.99995ZM4.99995 20C4.71662 20 4.47912 19.9042 4.28745 19.7125C4.09578 19.5208 3.99995 19.2833 3.99995 19V14H3.82495C3.50828 14 3.24995 13.8792 3.04995 13.6375C2.84995 13.3958 2.78328 13.1167 2.84995 12.8L3.84995 7.8C3.89995 7.56667 4.01662 7.375 4.19995 7.225C4.38328 7.075 4.59162 7 4.82495 7H19.175C19.4083 7 19.6166 7.075 19.8 7.225C19.9833 7.375 20.1 7.56667 20.15 7.8L21.15 12.8C21.2166 13.1167 21.15 13.3958 20.95 13.6375C20.75 13.8792 20.4916 14 20.175 14H20V19C20 19.2833 19.9041 19.5208 19.7125 19.7125C19.5208 19.9042 19.2833 20 19 20C18.7166 20 18.4791 19.9042 18.2875 19.7125C18.0958 19.5208 18 19.2833 18 19V14H14V19C14 19.2833 13.9041 19.5208 13.7125 19.7125C13.5208 19.9042 13.2833 20 13 20H4.99995ZM5.99995 18H12V14H5.99995V18Z" fill="#8D191D" />
								</svg>
								<span>{point.info.city},{point.info.address}</span>
							</div>
							<div className="head_goodplase">
								{
									goodPlaceId &&
									<div className="goodpalese"><iframe src={`https://yandex.ru/sprav/widget/rating-badge/${goodPlaceId}?type=award`} width="150" height="50" frameBorder="0"></iframe></div>
								}
							</div>
						</div>
					</>
				}
			</section>

			{
				point &&
				<div className="head-phone">
					<img src={require('assets/images/icons/phone.png')} alt="" />
					<a href={`tel:${point.info.phone}`} style={{ textDecoration: 0, color: '#8D191D' }}>{point.info.phone}</a>
				</div>
			}
			<section>
				<div className="head-auth">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#8D191D" />
					</svg>
					{
						user && user.phone ? <NavLink to={ROUTE_APP.PROFILE.PROFILE_MAIN}>Профиль</NavLink> : <NavLink to={ROUTE_APP.AUTH.REGISTER}>Войти</NavLink>
					}

				</div>
				{
					point &&
					<div className="head-cart">
						
						{
							cartprice && cartprice.fullPrice !== 0 
							?
							<NavLink to={ROUTE_APP.CART.BASKET_MAIN}><img src={require('assets/images/icons/shopping_basket.png')} />
							<span>{cartprice.fullPrice} ₽</span>
							</NavLink>
							
							: <a><img src={require('assets/images/icons/shopping_basket.png')} />Корзина</a>
						}
						
					</div>
				}
				
			</section>
		</div>
		<MainMenuDesc />
		</>
	)
}
export default observer(HOCdescHead) 