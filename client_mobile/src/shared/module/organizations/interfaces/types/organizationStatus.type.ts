import { OrganizationStatusEntity } from '../../domain/entities/organizationStatus.entity';

export type IPointStatusRequest = {
	_id: string;
	organization: string;
	deliveryMetod: string[];
	organizationStatus: string;
	paymentMetod: string[];
};

export type IOrganizationStatus = OrganizationStatusEntity;
export type IOrganizationStatusMetods = {
	timeworkOrganization: IWorkTimePoint
	deliveryTipesMetods: IDeliveryTypes[]
} & IOrganizationStatus


export type IDeliveryTypes = {
	metod: string;
	name: string;
	active: boolean;
	sort?: number;
};

export type IWorkTimePoint = {
	typework: 'WORK' | 'NOWORK' | 'ONWORK';
	todaytime: string[];
	timelist: string[] | string;
};
