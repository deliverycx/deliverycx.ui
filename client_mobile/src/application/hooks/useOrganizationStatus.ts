/* eslint-disable @typescript-eslint/no-inferrable-types */

import {
	DELIVERY_METODS,
	ORG_STATUS,
} from 'application/contstans/const.orgstatus';
import { workTimeHelp } from 'application/helpers/workTime';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import {
	IOrganizationStatus,
	IPointStatus,
} from 'modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type';
import {
	organizationModel,
	organizationStatusComandBus,
	organizationStatusModel,
	organizationStatusModule,
	useCaseOrganizationStatus,
} from 'modules/OrganizationModule/organization.module';
import React, { ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export class StatusTSX {
	public readonly pointstatus: {
		organizationStatus: string;
		timeworkOrganization: string;
		deliveryTipe: any;
	};
	public statuses: {
		name: string;
		exect: boolean;
		content: ReactNode;
	} | null = null;
	constructor(
		organizationStatus: string = '',
		timeworkOrganization: string = '',
		deliveryTipe: any = [],
	) {
		this.pointstatus = {
			organizationStatus,
			timeworkOrganization,
			deliveryTipe,
		};
	}

	private init(name: string, exect: boolean, content: ReactNode) {
		/*
		this.statuses.push({
			name:name,
			exect: exect,
			content:content
		})
		*/
		console.log('exect', exect);
		if (exect) {
			this.statuses = {
				name,
				exect,
				content,
			};
			return true;
		}

		return false;
	}

	OpenPoint(tsx?: ReactNode) {
		return this.init(
			'Открытие',
			this.pointstatus.organizationStatus === ORG_STATUS.OPEN,
			tsx,
		);
	}
	NoDeliveryPoint(tsx?: ReactNode) {
		return this.init(
			'нет заказа',
			this.pointstatus.organizationStatus === ORG_STATUS.NODELIVERY,
			tsx,
		);
	}
	NoWorkPoint(tsx?: ReactNode) {
		return this.init(
			'точка не работает',
			this.pointstatus.organizationStatus === ORG_STATUS.NOWORK,
			tsx,
		);
	}

	SezonNoWork(tsx?: ReactNode) {
		return this.init(
			'временно не работает',
			this.pointstatus.organizationStatus === ORG_STATUS.SEZONNOTWORK,
			tsx,
		);
	}

	DeliveryPickUP(tsx?: ReactNode) {
		const delivery = this.pointstatus.deliveryTipe.find((val: any) => {
			return val.metod === DELIVERY_METODS.COURIER;
		});

		return this.init(
			'доставка и самовывоз',
			delivery &&
			this.pointstatus.organizationStatus === ORG_STATUS.WORK &&
			this.pointstatus.timeworkOrganization !== ORG_STATUS.NOWORK &&
			this.pointstatus.timeworkOrganization !== ORG_STATUS.ONWORK &&
			this.pointstatus.timeworkOrganization !== ORG_STATUS.ONLINE_CLOSED,
			tsx,
		);
	}

	NoTimeWork(tsx?: ReactNode) {
		return this.init(
			'закрылась',
			this.pointstatus.timeworkOrganization === ORG_STATUS.NOWORK &&
			this.pointstatus.organizationStatus === ORG_STATUS.WORK,
			tsx,
		);
	}

	ONTimeWork(tsx?: ReactNode) {
		return this.init(
			'скоро закроется',
			this.pointstatus.timeworkOrganization === ORG_STATUS.ONWORK &&
			this.pointstatus.organizationStatus === ORG_STATUS.WORK,
			tsx,
		);
	}

	ONlineClosed(tsx?: ReactNode) {
		return this.init(
			'закрылась онлайн',
			this.pointstatus.timeworkOrganization === ORG_STATUS.ONLINE_CLOSED &&
			this.pointstatus.organizationStatus === ORG_STATUS.WORK,
			tsx,
		);
	}

	OnliPICKUP(tsx?: ReactNode) {
		const picup = this.pointstatus.deliveryTipe.find((val: any) => {
			return val.metod === DELIVERY_METODS.COURIER;
		});

		return this.init(
			'Только самовывоз',
			!picup &&
			this.pointstatus.organizationStatus !== ORG_STATUS.OPEN &&
			this.pointstatus.organizationStatus !== ORG_STATUS.NODELIVERY &&
			this.pointstatus.organizationStatus !== ORG_STATUS.SEZONNOTWORK &&
			this.pointstatus.organizationStatus !== ORG_STATUS.NOWORK,
			tsx,
		);
	}
}

export const useOrganizationStatus = (
	organization?: any,
): [StatusTSX | null, any] => {
	const [pointStatus, setPointStatus] = useState<any>();
	const metods = organizationStatusModel.organizationStatusMetods;

	useEffect(() => {
		if (organization) {
			setPointStatus(organization);
		} else {
			metods && setPointStatus(metods);
		}
	}, [organization, metods]);

	if (pointStatus) {
		const { organizationStatus, timeworkOrganization, deliveryTipe } =
			pointStatus;

		const tsx = new StatusTSX(
			organizationStatus,
			timeworkOrganization.typework,
			deliveryTipe,
		);
		const switchMetod = () => {
			const wrappers = tsx.statuses;

			if (wrappers) {
				const w = React.createElement(
					React.Fragment,
					{ key: wrappers.name },
					wrappers.content,
				);
				return React.createElement(React.Fragment, null, w);
			}
			return false;
		};
		return [tsx, switchMetod];
	} else {
		return [null, null];
	}
};
