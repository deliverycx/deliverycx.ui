import { FC } from "react"
import { organizationStatusModel } from "modules/OrganizationModule/organization.module";
import { observer } from "mobx-react-lite";

const OrderNotificate:FC<{masage:'onwork' | 'nowork'}> = ({masage}) =>{
	const time = organizationStatusModel.timeworkOrganization
	console.log(time);

	if(masage === 'onwork'){
		return(
			<div className="order-placement__form">
				<div className="order-placement__tabs__notification">
					<h3>Хинкальная скоро закроется</h3>
					<h4>Но вы ещё успеваете воспользоваться самовывозом</h4>
					<h5>Оформить доставку можно с 10:00–21:00</h5>
					<small>А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице</small>
				</div>
			</div>
		)
	}
	if(masage === 'nowork'){
		<div className="order-placement__form">
				<div className="order-placement__tabs__notification">
					<h3>Хинкальная закрылась</h3>
					<h5>Оформить доставку можно с 10:00–21:00</h5>
					<small>А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице</small>
				</div>
			</div>
	}
}
export default observer(OrderNotificate) 