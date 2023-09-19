/* eslint-disable no-irregular-whitespace */
import ModalCard from "application/components/common/Modals/ModalCard";
import { useOrganizationStatus } from "application/hooks/useOrganizationStatus"
import { observer } from "mobx-react-lite";
import { organizationModel } from "modules/OrganizationModule/organization.module";
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';

const OrganizationStatus = () => {
	const {timeworkOrganization} = organizationModel
	const [statusTSX, switchMetod] = useOrganizationStatus()
	const [modal, setModal] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		statusTSX.statuses && setModal(true)

	}, [])

	statusTSX.NoWorkPoint((
		<div className="modal__wrapper">
			<div className="modal__header">
				<div className="modal__header-btn">
					<img className="no-drag" onClick={() => setModal(false)} src={require("assets/images/icons/close.png")} alt="" />
				</div>
				<h3>В данный момент заведение не принимает онлайн-заказ.</h3>
			</div>
			<div className="modal__content gap-8">
				<strong>С удовольствием примем его немного позднее!</strong>
				<p>
					А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице
				</p>

				<button onClick={() => setModal(false)} className="btn btn-sm btn-gray no-drag">
					Назад
				</button>
				<button onClick={()=> navigate(ROUTE_APP.SHOP.SHOP_MAIN)} className="btn btn-sm btn-none no-drag">
					Посмотреть меню
				</button>
			</div>
		</div>
	))

	statusTSX.OpenPoint((
		<div className="modal__wrapper">
			<div className="modal__header">
				<div className="modal__header-btn">
					<img className="no-drag" onClick={() => setModal(false)} src={require("assets/images/icons/close.png")} alt="" />
				</div>
				<h3>Скоро открытие</h3>
			</div>
			<div className="modal__content gap-8">
				<strong>Заведение только готовится к открытию</strong>
				<button onClick={() => setModal(false)} className="btn btn-sm btn-gray no-drag">
					Назад
				</button>
			</div>
		</div>
	))

	statusTSX.NoDeliveryPoint((
		<div className="modal__wrapper">
			<div className="modal__header">
				<div className="modal__header-btn">
					<img className="no-drag" onClick={() => setModal(false)} src={require("assets/images/icons/close.png")} alt="" />
				</div>
				<h3>Онлайн-заказ не доступен</h3>
			</div>
			<div className="modal__content gap-8">
				<span className="bold">Заказ на сайте временно не доступен. Оформить заказ вы можете по телефону.</span>
				<strong>Приносим извинения за неудобства!</strong>
				<p>
					А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице
				</p>
				<a href="tel:+79781297087" className="btn btn-sm btn-red no-drag">
				<img src={require('assets/images/icons/phonewite.png')} alt="" />
					+7 978 129-70-87
				</a>
				<button onClick={() => setModal(false)} className="btn btn-sm btn-gray no-drag">
					Назад
				</button>
				<button onClick={()=> navigate(ROUTE_APP.SHOP.SHOP_MAIN)} className="btn btn-sm btn-none no-drag">
					Посмотреть меню
				</button>
			</div>
		</div>
	))

	statusTSX.NoTimeWork((
		<div className="modal__wrapper">
			<div className="modal__header">
				<div className="modal__header-btn">
					<img className="no-drag" onClick={() => setModal(false)} src={require("assets/images/icons/close.png")} alt="" />
				</div>
				<h3>Хинкальная закрыта</h3>
			</div>
			<div className="modal__content gap-8">
				
				<strong>Оформить доставку можно с {timeworkOrganization?.todaytime[0]} - {timeworkOrganization?.todaytime[1]}</strong>
				<p>
					А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице
				</p>
				<button onClick={()=> navigate(ROUTE_APP.MAIN)} className="btn btn-sm btn-red no-drag">
				На главную
				</button>
				<button onClick={() => setModal(false)} className="btn btn-sm btn-gray no-drag">
					Назад
				</button>

			</div>
		</div>
	))

	statusTSX.ONTimeWork((
		<div className="modal__wrapper">
			<div className="modal__header">
				<div className="modal__header-btn">
					<img className="no-drag" onClick={() => setModal(false)} src={require("assets/images/icons/close.png")} alt="" />
				</div>
				<h3>Хинкальная скоро закроется</h3>
			</div>
			<div className="modal__content gap-8">
				<span className="bold">Но вы ещё успеваете воспользоваться самовывозом</span>
				<strong>Оформить доставку можно с {timeworkOrganization?.todaytime[0]} - {timeworkOrganization?.todaytime[1]}</strong>
				<p>
					А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице
				</p>
				<button onClick={()=> navigate(ROUTE_APP.MAIN)} className="btn btn-sm btn-red no-drag">
				На главную
				</button>
				<button onClick={() => setModal(false)} className="btn btn-sm btn-gray no-drag">
					Назад
				</button>
				<button className="btn btn-sm btn-none no-drag">
				Самовывоз
				</button>
			</div>
		</div>
	))


	return (
		<>
			{
				modal &&
				<ModalCard setIsOpened={setModal}>
					{
						switchMetod()
					}
				</ModalCard>

			}

		</>
	)
}
export default observer(OrganizationStatus)