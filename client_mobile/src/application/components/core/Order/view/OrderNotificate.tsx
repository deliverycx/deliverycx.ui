import { FC } from "react"
import { organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { observer } from "mobx-react-lite";

const OrderNotificate:FC<{masage:'onwork' | 'nowork'}> = ({masage}) =>{
	const time = organizationStatusModel.timeworkOrganization


	if(masage === 'onwork'){
		return(
			<div className="order-placement__form">
				<div className="order-placement__tabs__notification">
					<h3>Хинкальная скоро закроется</h3>
					<h4>Но вы ещё успеваете воспользоваться самовывозом</h4>
					<h5>Оформить доставку можно с {time && time.todaytime[0]} до {time && time.todaytime[1]}</h5>
					<small>А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице</small>
				</div>
			</div>
		)
	}
	if(masage === 'nowork'){
		<div className="order-placement__form">
				<div className="order-placement__tabs__notification">
					<h3>Хинкальная закрылась</h3>
					<h5>Оформить доставку можно с {time && time.todaytime[0]} до {time && time.todaytime[1]}</h5>
					<small>А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице</small>
				</div>
			</div>
	}
}
export default observer(OrderNotificate) 