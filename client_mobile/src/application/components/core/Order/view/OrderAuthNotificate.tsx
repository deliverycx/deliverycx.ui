/* eslint-disable no-irregular-whitespace */
import ModalCard from "application/components/common/Modals/ModalCard"
import { ROUTE_APP } from "application/contstans/route.const"
import { appModel, appUseCase } from "modules/AppModule/app.module"
import { FC, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const OrderAuthNotificate: FC<{ openmodal: boolean }> = ({ openmodal }) => {
	const { authnotificate } = appModel
	const navigate = useNavigate()
	const [modal, setModal] = useState(openmodal)



	return (
		<>
			{
				modal && !authnotificate &&
				<ModalCard setIsOpened={() => {
					setModal(false)
					appUseCase.authNotificate(true)
				}}>
					<div className="modal">
						<div className="modal__wrapper">
							<div className="unauthorized__content">
								<div className="unauthorized__content-sticker">
									<img src={require("assets/images/delivery/order_auth.png")} alt="Весёлый хинкалик" />
								</div>
								<div className="unauthorized__content-title">Перед тем как продолжить рекомендуем авторизироваться</div>
								<div className="unauthorized__content-text">
								Поздравим с днём рождения, расскажем об акциях,<br /> предложим специальные условия и многое другое
								</div>
							</div>
							<div className="unauthorized__buttons">
								
								<button onClick={() => {
									navigate(ROUTE_APP.AUTH.REGISTER)
									appUseCase.authNotificate(true)
								}} className="btn btn-md btn-red">Войти</button>
								<button onClick={() => {
									setModal(false)
									appUseCase.authNotificate(true)
								}} className="btn btn-md btn-gray">Пропустить</button>
							</div>
						</div>
					</div>
				</ModalCard>
			}
		</>

	)
}
export default observer(OrderAuthNotificate) 