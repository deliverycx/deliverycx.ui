import { observer } from 'mobx-react-lite';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { requestOrganizationStatus } from 'modules/OrganizationModule/OrganizationStatuses/data/organizationStatus.request';
import { IOrganizationStatus, IWorkTimePoint } from 'modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type';
import { organizationModel, organizationStatusModel, organizationModule } from 'modules/OrganizationModule/organization.module';
import { FC, useEffect, useState } from 'react';
import cn from 'classnames'
import { isDesctomMediaQuery } from 'application/ResponseMedia';
import { appUseCase } from 'modules/AppModule/app.module';
import { orderModel } from 'modules/OrderModule/order.module';


type IProps = {
	organization: IOrganization & IOrganizationStatus
	setCordPoint: any
	set: any
	setPointIndex:any
}

const OrganizationListsItem: FC<IProps> = ({ organization, setCordPoint,setPointIndex, set }) => {

	const {selectOrganization} = organizationModel
	const desc = isDesctomMediaQuery()



	const handlerSetCords = () => {
		setCordPoint(organization.info.cords)
		setPointIndex(organization.guid)
		set(false)
	}

	const handlerSelectPoint = () =>{
		
		if(desc && selectOrganization){
			
			if(selectOrganization.guid !== organization.guid){
				appUseCase.crealPoint()
			}
			
		}
		organizationModule.handlerBus.choosePoint(organization)
		setPointIndex(organization.guid)
		setCordPoint(organization.info.cords)
		set(false)
	}

	
	const CN = cn('orglist_box-item',{active:selectOrganization?.id === organization.id})
	return (
		<div className={CN}>
			<div className="orglistitem_geo" onClick={handlerSetCords}>
				
				
			</div>
			<div className="orglistitem_point" onClick={handlerSelectPoint}>
				<h3 className="orglistitem_point-title">{organization.info.address}</h3>
				{
					organization.timeworkOrganization && organization.timeworkOrganization.typework === 'WORK'
					&& <div className="orglistitem_point-time open">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.66671 7.7335V5.3335C8.66671 5.14461 8.60282 4.98627 8.47504 4.8585C8.34726 4.73072 8.18893 4.66683 8.00004 4.66683C7.81115 4.66683 7.65282 4.73072 7.52504 4.8585C7.39726 4.98627 7.33337 5.14461 7.33337 5.3335V7.9835C7.33337 8.07239 7.35004 8.1585 7.38337 8.24183C7.41671 8.32516 7.46671 8.40016 7.53337 8.46683L9.73337 10.6668C9.8556 10.7891 10.0112 10.8502 10.2 10.8502C10.3889 10.8502 10.5445 10.7891 10.6667 10.6668C10.7889 10.5446 10.85 10.3891 10.85 10.2002C10.85 10.0113 10.7889 9.85572 10.6667 9.7335L8.66671 7.7335ZM8.00004 14.6668C7.07782 14.6668 6.21115 14.4918 5.40004 14.1418C4.58893 13.7918 3.88337 13.3168 3.28337 12.7168C2.68337 12.1168 2.20837 11.4113 1.85837 10.6002C1.50837 9.78905 1.33337 8.92239 1.33337 8.00016C1.33337 7.07794 1.50837 6.21127 1.85837 5.40016C2.20837 4.58905 2.68337 3.8835 3.28337 3.2835C3.88337 2.6835 4.58893 2.2085 5.40004 1.8585C6.21115 1.5085 7.07782 1.3335 8.00004 1.3335C8.92226 1.3335 9.78893 1.5085 10.6 1.8585C11.4112 2.2085 12.1167 2.6835 12.7167 3.2835C13.3167 3.8835 13.7917 4.58905 14.1417 5.40016C14.4917 6.21127 14.6667 7.07794 14.6667 8.00016C14.6667 8.92239 14.4917 9.78905 14.1417 10.6002C13.7917 11.4113 13.3167 12.1168 12.7167 12.7168C12.1167 13.3168 11.4112 13.7918 10.6 14.1418C9.78893 14.4918 8.92226 14.6668 8.00004 14.6668Z" fill="#558950" />
						</svg>
						<span>Открыто до {organization.timeworkOrganization.todaytime[1]}</span>
					</div>

				}
				{
					organization.timeworkOrganization && organization.timeworkOrganization.typework === 'NOWORK' && <div className="orglistitem_point-time close">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.66671 7.7335V5.3335C8.66671 5.14461 8.60282 4.98627 8.47504 4.8585C8.34726 4.73072 8.18893 4.66683 8.00004 4.66683C7.81115 4.66683 7.65282 4.73072 7.52504 4.8585C7.39726 4.98627 7.33337 5.14461 7.33337 5.3335V7.9835C7.33337 8.07239 7.35004 8.1585 7.38337 8.24183C7.41671 8.32516 7.46671 8.40016 7.53337 8.46683L9.73337 10.6668C9.8556 10.7891 10.0112 10.8502 10.2 10.8502C10.3889 10.8502 10.5445 10.7891 10.6667 10.6668C10.7889 10.5446 10.85 10.3891 10.85 10.2002C10.85 10.0113 10.7889 9.85572 10.6667 9.7335L8.66671 7.7335ZM8.00004 14.6668C7.07782 14.6668 6.21115 14.4918 5.40004 14.1418C4.58893 13.7918 3.88337 13.3168 3.28337 12.7168C2.68337 12.1168 2.20837 11.4113 1.85837 10.6002C1.50837 9.78905 1.33337 8.92239 1.33337 8.00016C1.33337 7.07794 1.50837 6.21127 1.85837 5.40016C2.20837 4.58905 2.68337 3.8835 3.28337 3.2835C3.88337 2.6835 4.58893 2.2085 5.40004 1.8585C6.21115 1.5085 7.07782 1.3335 8.00004 1.3335C8.92226 1.3335 9.78893 1.5085 10.6 1.8585C11.4112 2.2085 12.1167 2.6835 12.7167 3.2835C13.3167 3.8835 13.7917 4.58905 14.1417 5.40016C14.4917 6.21127 14.6667 7.07794 14.6667 8.00016C14.6667 8.92239 14.4917 9.78905 14.1417 10.6002C13.7917 11.4113 13.3167 12.1168 12.7167 12.7168C12.1167 13.3168 11.4112 13.7918 10.6 14.1418C9.78893 14.4918 8.92226 14.6668 8.00004 14.6668Z" fill="#8D191D" />
						</svg>
						<span>Закрыто</span> 
					</div>
				}

			</div>
			{
				selectOrganization?.id === organization.id &&
				<img src={require('assets/images/icons/doneok.png')} />
			}
		</div>
	)
}
export default observer(OrganizationListsItem)