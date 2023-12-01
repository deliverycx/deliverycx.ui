/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-irregular-whitespace */
import ModalCard from "application/components/common/Modals/ModalCard";
import { StatusTSX } from "application/hooks/useOrganizationStatus"
import { observer } from "mobx-react-lite";
import { organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { useQuery } from "react-query";
import React from "react";

const OrganizationStatus:FC<{organization:IOrganization}> = ({organization}) => {
	const point = organizationModel.selectOrganization
	const { timeworkOrganization } = organizationStatusModel

	const [statusTSX,setStatusTSX] = useState<any>()
	
	const getStatus = async (organization:any) =>{
		try {
			const result = await useCaseOrganizationStatus.statusPointsList(organization)
			if(result){
				const tsx = new StatusTSX(result.organizationStatus as string, result.timeworkOrganization.typework,result.deliveryTipe)
			
				setStatusTSX(tsx)
			}
			
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		organization && getStatus(organization)
	},[organization])


	const switchMetod = (status:any) => {

		const wrappers = status.statuses
		
		if (wrappers) {
			const w = React.createElement(React.Fragment, { key: wrappers.name }, wrappers.content)
			return React.createElement(React.Fragment, null, w)
		}
		return false
	
	}




	statusTSX && statusTSX.NoWorkPoint((

		<div className="order-placement__form">
			<div className="order-placement__tabs__notification">
				<h3>В данный момент заведение не принимает онлайн-заказ</h3>
				<strong>С удовольствием примем его немного позднее!</strong>
				<p>
					А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице
				</p>
			</div>
		</div>
	))

	statusTSX && statusTSX.OpenPoint((

		<div className="order-placement__form">
			<div className="order-placement__tabs__notification">
				<h3>Скоро открытие</h3>
				<h4>Заведение только готовится к открытию</h4>

			</div>
		</div>
	))

	statusTSX && statusTSX.NoDeliveryPoint((

		<div className="order-placement__form">
			<div className="order-placement__tabs__notification">
				<h3>Онлайн-заказ не доступен</h3>
				<span className="bold">Заказ на сайте временно не доступен. Оформить заказ вы можете по телефону.</span>
				<strong>Приносим извинения за неудобства!</strong>
				<p>
					А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице
				</p>
				<a href={`tel:${point?.info.phone}`} className="btn btn-sm btn-red no-drag">
					<img src={require('assets/images/icons/phonewite.png')} alt="" />
					{point?.info.phone}
				</a>
			</div>
		</div>
	))

	statusTSX && statusTSX.OnliPICKUP((
		<div className="order-placement__form">
			<div className="order-placement__tabs__notification">
				<h3>У данного заведения нету доставки</h3>
				<h5>Для заказа курьером выберите другое заведение</h5>
				<small>или воспользуйтесь <b>самовывозом</b> </small>
			</div>
		</div>
	))

	statusTSX && statusTSX.NoTimeWork((

		<div className="order-placement__form">
			<div className="order-placement__tabs__notification">
				<h3>Хинкальная закрылась</h3>
				<h5>Оформить доставку можно с {timeworkOrganization?.todaytime[0]} - {timeworkOrganization?.todaytime[1]}</h5>
				<small>А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице</small>
			</div>
		</div>
	))

	statusTSX && statusTSX.ONTimeWork((

		<div className="order-placement__form">
			<div className="order-placement__tabs__notification">
				<h3>Хинкальная скоро закроется</h3>
				<h4>Но вы ещё успеваете воспользоваться самовывозом</h4>
				<h5>Оформить доставку можно с {timeworkOrganization?.todaytime[0]} - {timeworkOrganization?.todaytime[1]}</h5>
				<small>А пока вы можете ознакомиться с нашим меню и почитать новости на главной странице</small>
			</div>
		</div>
	))


	return (
		<>
			{
				statusTSX && switchMetod(statusTSX)

			}

		</>
	)
}
export default observer(OrganizationStatus)