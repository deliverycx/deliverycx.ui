import ModalCard from 'application/components/common/Modals/ModalCard';
import { FC, memo, useContext, useEffect, useState } from 'react';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { PointsContext } from '../HOC.OrganizationCard';
import { ORG_STATUS } from 'application/contstans/const.orgstatus';
import { checkWorkIsArray } from 'application/helpers/workTime';
import cn from "classnames";
import { createPortal } from 'react-dom';

type IProps = {
	organization: IOrganization
}

const OranizationWorkTime = () => {
	const [modalWork, setModalWork] = useState(false)
	const useCasePoints = useContext(PointsContext)
	const { selectOrganization, timeworkOrganization, cardModal } = useCasePoints.data


	const [activeDate, setActiveDate] = useState<number>(0)

	const dni = ["Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
		"Воскресенье"]

	const date = new Date().getDay()

	useEffect(() => {
		if (date === 0) {
			setActiveDate(6)
		} else {
			setActiveDate(date - 1)
		}
	}, [date, selectOrganization.workTime])



	const checktype = !!(typeof checkWorkIsArray(selectOrganization.workTime) === 'string')
	return (
		<>
			<div className="institute-phone">
				<button onClick={() => setModalWork(true)} className="btn btn-mini btn-gray no-drag">
					<img src={require('assets/images/icons/schedule.png')} alt="" />
					{
						timeworkOrganization.typework === ORG_STATUS.NOWORK
							? "Закрыто"
							: `Открыто до ${timeworkOrganization.todaytime[1]}`
					}
					{
						!checktype &&
						<img src={require('assets/images/icons/keyboard_arrow_down.png')} alt="" />
					}
					
				</button>
				<button className="btn btn-mini btn-gray no-drag">
					<img src={require('assets/images/icons/phone.png')} alt="" />
					<a href="tel:+79782287220" style={{textDecoration: 0, color: '#8D191D'}}>+7 978 228-72-20</a>
				</button>
			</div>
			{modalWork && !checktype &&
				<ModalCard setIsOpened={setModalWork} theme="children">

					<div className="modal__wrapper">
						<div className="modal__header">
							<div className="modal__header-btn">
								<img className="no-drag" onClick={() => setModalWork(false)} src={require('assets/images/icons/arrow_back.png')} alt="" />
							</div>
							<h3>Режим работы</h3>
						</div>
						<div className="modal__content">
							<ul className="map__schedule-list">
								{
									timeworkOrganization.timelist.map((value: string, index: number) => {
										const CNActive = cn("welcome_timebox_item", { active: activeDate === index })
										return (
											<li key={index} className={CNActive}>
												<span>{dni[index]}</span>
												<span>{value}</span>
											</li>
										)
									})
								}

							</ul>
						</div>
					</div>

				</ModalCard>
			}
		</>
	)
}
export default memo(OranizationWorkTime) 