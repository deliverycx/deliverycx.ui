/* eslint-disable @typescript-eslint/no-var-requires */
import { IPoint } from '@types';
import { DELIVERY_METODS, ORG_STATUS } from 'application/contstans/const.orgstatus';
import { workTimeHelp } from 'application/helpers/workTime';
import { useOrganizationStatus } from 'application/hooks/useOrganizationStatus';
import React, { FC } from 'react';
import { adapterSelector } from 'servises/redux/selectors/selectors';

type IProp = {
	point: IPoint
}

const PointStatus: FC<IProp> = ({ point }) => {
	const [statusTSX, switchMetod] = useOrganizationStatus()

	statusTSX.OnliPICKUP((
		<div className="welcome__select-adress__info onlypickup">
			<img
				src={require("assets/i/bag-red.svg").default}
				alt="Только самовывоз"
			/>
			<span>Только самовывоз</span>
		</div>
	))

	statusTSX.Delivery((
		<div className="welcome__select-adress__info onlypickup">
			<img
				src={require("assets/i/moto-red.svg").default}
				alt="Доставка и самовывоз"
			/>
			<span>Доставка и самовывоз</span>
		</div>
	))

	statusTSX.OpenPoint((
		<div className="welcome__select-adress__info onlyopen">
			<img
				src={require("assets/i/cloce.svg").default}
				alt="Скоро открытие"
			/>
			<span>Скоро открытие</span>
		</div>
	))
	statusTSX.NoDeliveryPoint((
		<div className="point-closed-container">
			<div className="text-bold">Хинкальная только открылась и готовится<br /> к подключению онлайн-заказов </div>
			<div className="text-secondary">Сейчас вы можете ознакомиться с нашим меню,<br /> просмотреть новости и узнать об актуальных акциях
			</div>

		</div>
	))
	statusTSX.NoWorkPoint((
		<div className="point-closed-container">
			<div className="text-bold">Онлайн-заказ в данной хинкальной недоступен</div>
			<div className="text-secondary">Приносим извинения за неудобства.</div>

		</div>
	))



	return (
		<>
			{
				switchMetod()
			}
			{workTimeHelp(point.workTime)
				&& statusTSX.pointstatus.organizationStatus === ORG_STATUS.WORK
				&&
				<div className="point-closed-container">
					<div className="text-bold">Наша хинкальная пока закрыта.<br /> Оформить заказ нельзя.</div>
					<div className="text-secondary">Сейчас вы можете ознакомится с нашим<br />
						меню и почитать новости
					</div>
				</div>
			}


		</>
	)
}
export default PointStatus