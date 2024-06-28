import ModalCard from 'application/components/common/Modals/ModalCard';
import { FC, memo, useContext, useEffect, useState } from 'react';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { PointsContext } from '../HOC.OrganizationCard';
import { ORG_STATUS } from 'application/contstans/const.orgstatus';
import { checkWorkIsArray } from 'application/helpers/workTime';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { useCaseOrganizationStatus } from 'modules/OrganizationModule/organization.module';
import { IOrganizationStatus } from 'modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type';
import ModalDesctop from 'application/components/common/Modals/ModalDesc/ModalsDesctop';
import { Desktop, Mobile } from 'application/ResponseMedia';

type IProps = {
	organization: IOrganization;
};

const OranizationWorkTime: FC<{
	organization: IOrganization & IOrganizationStatus;
}> = ({ organization }) => {
	const [modalWork, setModalWork] = useState(false);
	const [timeworkOrganization, setTimeworkOrganization] = useState<any>();

	const [activeDate, setActiveDate] = useState<number>(0);

	const dni = [
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
		'Воскресенье',
	];

	const date = new Date().getDay();

	useEffect(() => {
		if (date === 0) {
			setActiveDate(6);
		} else {
			setActiveDate(date - 1);
		}
	}, [date, organization.workTime]);

	const checktype = !!(
		typeof checkWorkIsArray(organization.workTime) === 'string'
	);


	return (
		<>
			<div className="institute-phone">
				{organization.timeworkOrganization && (
					<button
						onClick={() => setModalWork(true)}
						className="btn btn-mini btn-gray no-drag"
					>
						<svg
							width="15"
							height="14"
							viewBox="0 0 15 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.16671 6.7335V4.3335C8.16671 4.14461 8.10282 3.98627 7.97504 3.8585C7.84726 3.73072 7.68893 3.66683 7.50004 3.66683C7.31115 3.66683 7.15282 3.73072 7.02504 3.8585C6.89726 3.98627 6.83337 4.14461 6.83337 4.3335V6.9835C6.83337 7.07239 6.85004 7.1585 6.88337 7.24183C6.91671 7.32516 6.96671 7.40016 7.03337 7.46683L9.23337 9.66683C9.3556 9.78905 9.51115 9.85016 9.70004 9.85016C9.88893 9.85016 10.0445 9.78905 10.1667 9.66683C10.2889 9.54461 10.35 9.38905 10.35 9.20016C10.35 9.01127 10.2889 8.85572 10.1667 8.7335L8.16671 6.7335ZM7.50004 13.6668C6.57782 13.6668 5.71115 13.4918 4.90004 13.1418C4.08893 12.7918 3.38337 12.3168 2.78337 11.7168C2.18337 11.1168 1.70837 10.4113 1.35837 9.60016C1.00837 8.78905 0.833374 7.92239 0.833374 7.00016C0.833374 6.07794 1.00837 5.21127 1.35837 4.40016C1.70837 3.58905 2.18337 2.8835 2.78337 2.2835C3.38337 1.6835 4.08893 1.2085 4.90004 0.858496C5.71115 0.508496 6.57782 0.333496 7.50004 0.333496C8.42226 0.333496 9.28893 0.508496 10.1 0.858496C10.9112 1.2085 11.6167 1.6835 12.2167 2.2835C12.8167 2.8835 13.2917 3.58905 13.6417 4.40016C13.9917 5.21127 14.1667 6.07794 14.1667 7.00016C14.1667 7.92239 13.9917 8.78905 13.6417 9.60016C13.2917 10.4113 12.8167 11.1168 12.2167 11.7168C11.6167 12.3168 10.9112 12.7918 10.1 13.1418C9.28893 13.4918 8.42226 13.6668 7.50004 13.6668Z"
								fill="#333333"
							/>
						</svg>
						{organization.timeworkOrganization.typework === ORG_STATUS.NOWORK
							? 'Закрыто'
							: `Открыто до ${organization.timeworkOrganization.todaytime[1]}`}
						{!checktype && (
							<svg
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.91327 6.19354L8.49994 8.7802L11.0866 6.19354C11.3466 5.93354 11.7666 5.93354 12.0266 6.19354C12.2866 6.45354 12.2866 6.87354 12.0266 7.13353L8.96661 10.1935C8.70661 10.4535 8.28661 10.4535 8.02661 10.1935L4.96661 7.13353C4.70661 6.87354 4.70661 6.45354 4.96661 6.19354C5.22661 5.9402 5.65327 5.93354 5.91327 6.19354Z"
									fill="#333333"
								/>
							</svg>
						)}
					</button>
				)}

				<button className="btn btn-mini btn-gray no-drag">
					<svg
						width="17"
						height="16"
						viewBox="0 0 17 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.8 14C12.3667 14 10.9694 13.6806 9.60833 13.0417C8.24722 12.4028 7.04167 11.5583 5.99167 10.5083C4.94167 9.45833 4.09722 8.25278 3.45833 6.89167C2.81944 5.53056 2.5 4.13333 2.5 2.7C2.5 2.5 2.56667 2.33333 2.7 2.2C2.83333 2.06667 3 2 3.2 2H5.9C6.05556 2 6.19444 2.05 6.31667 2.15C6.43889 2.25 6.51111 2.37778 6.53333 2.53333L6.96667 4.86667C6.98889 5.02222 6.98611 5.16389 6.95833 5.29167C6.93056 5.41944 6.86667 5.53333 6.76667 5.63333L5.16667 7.26667C5.63333 8.06667 6.21667 8.81667 6.91667 9.51667C7.61667 10.2167 8.38889 10.8222 9.23333 11.3333L10.8 9.76667C10.9 9.66667 11.0306 9.59167 11.1917 9.54167C11.3528 9.49167 11.5111 9.47778 11.6667 9.5L13.9667 9.96667C14.1222 10 14.25 10.075 14.35 10.1917C14.45 10.3083 14.5 10.4444 14.5 10.6V13.3C14.5 13.5 14.4333 13.6667 14.3 13.8C14.1667 13.9333 14 14 13.8 14Z"
							fill="#333333"
						/>
					</svg>
					<a
						href={`tel:${organization.info.phone}`}
						style={{ textDecoration: 0, color: '#8D191D' }}
					>
						{organization.info.phone}
					</a>
				</button>
			</div>
			{modalWork && !checktype && (
				<>
					<Desktop>
						<ModalDesctop
							setIsOpened={setModalWork}
							theme={'children'}
							title="Режим работы"
						>
							<div className="modal__content point-time_container-desc">
								<ul className="map__schedule-list">
									{organization.timeworkOrganization &&
										Array.isArray(organization.timeworkOrganization.timelist) &&
										organization.timeworkOrganization.timelist.map(
											(value: string, index: number) => {
												const CNActive = cn('welcome_timebox_item', {
													active: activeDate === index,
												});
												return (
													<li key={index} className={CNActive}>
														<span>{dni[index]}</span>
														<span>{value}</span>
													</li>
												);
											},
										)}
								</ul>
							</div>
						</ModalDesctop>
					</Desktop>
					<Mobile>
						<ModalCard setIsOpened={setModalWork} theme="children-pre">
							<div className="modal__wrapper">
								<div className="modal__header">
									<div className="modal__header-btn">
										<img
											className="no-drag"
											onClick={() => setModalWork(false)}
											src={require('assets/images/icons/arrow_back.png')}
											alt=""
										/>
									</div>
									<h3>Режим работы</h3>
								</div>
								<div className="modal__content">
									<ul className="map__schedule-list">
										{organization.timeworkOrganization &&
											Array.isArray(
												organization.timeworkOrganization.timelist,
											) &&
											organization.timeworkOrganization.timelist.map(
												(value: string, index: number) => {
													const CNActive = cn('welcome_timebox_item', {
														active: activeDate === index,
													});
													return (
														<li key={index} className={CNActive}>
															<span>{dni[index]}</span>
															<span>{value}</span>
														</li>
													);
												},
											)}
									</ul>
								</div>
							</div>
						</ModalCard>
					</Mobile>
				</>
			)}
		</>
	);
};
export default memo(OranizationWorkTime);
