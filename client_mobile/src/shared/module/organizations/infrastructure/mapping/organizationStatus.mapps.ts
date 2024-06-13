import { OrganizationStatusEntity } from '../../domain/entities/organizationStatus.entity';
import { IPointStatusRequest } from '../../interfaces/types/organizationStatus.type';

export const organizationStatusDTO = new OrganizationStatusEntity();

export const organizationStatusMapper = (val: IPointStatusRequest) => {
	organizationStatusDTO.deliveryMetod = val.deliveryMetod;
	organizationStatusDTO.organization = val.organization;
	organizationStatusDTO.organizationStatus = val.organizationStatus;
	organizationStatusDTO.paymentMetod = val.paymentMetod;

	return { ...organizationStatusDTO };
};
