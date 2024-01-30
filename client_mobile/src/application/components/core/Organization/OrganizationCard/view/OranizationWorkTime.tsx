import ModalCard from 'application/components/common/Modals/ModalCard';
import { FC, memo, useContext, useEffect, useState } from 'react';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { PointsContext } from '../HOC.OrganizationCard';
import { ORG_STATUS } from 'application/contstans/const.orgstatus';
import { checkWorkIsArray } from 'application/helpers/workTime';
import cn from "classnames";
import { createPortal } from 'react-dom';
import { useCaseOrganizationStatus } from 'modules/OrganizationModule/organization.module';

type IProps = {
	organization: IOrganization
}

const OranizationWorkTime:FC<{organization:IOrganization}> = ({organization}) => {
	const [modalWork, setModalWork] = useState(false)
	const [timeworkOrganization,setTimeworkOrganization] = useState<any>()


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

		if(organization.workTime){
			const time = useCaseOrganizationStatus.pointTimeWork(organization)
			
			time && setTimeworkOrganization(time)
		}

		
	}, [date, organization.workTime])

	

	const checktype = !!(typeof checkWorkIsArray(organization.workTime) === 'string')
	return (
		<>
			<div className="institute-phone">
				{
					timeworkOrganization &&  
					<button onClick={() => setModalWork(true)} className="btn btn-mini btn-gray no-drag">
						<img src={require('assets/images/icons/schedule.png')} alt="" />
						{
							(timeworkOrganization.typework === ORG_STATUS.NOWORK)
								? "Закрыто"
								: `Открыто до ${timeworkOrganization.todaytime[1]}`
						}
						{
							!checktype &&
							<img src={require('assets/images/icons/keyboard_arrow_down.png')} alt="" />
						}
						
					</button>
				}
				
				<button className="btn btn-mini btn-gray no-drag">
					<img src={require('assets/images/icons/phone.png')} alt="" />
					<a href={`tel:${organization.info.phone}`} style={{textDecoration: 0, color: '#8D191D'}}>{organization.info.phone}</a>
				</button>
			</div>
			{modalWork && !checktype &&
				<ModalCard setIsOpened={setModalWork} theme="children-pre">

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
									timeworkOrganization && timeworkOrganization.timelist.map((value: string, index: number) => {
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