import { IsNotEmpty, IsString, isArray } from 'class-validator';
import { IPointStatusRequest } from './organizationStatus.type';
import { mappersDTO } from 'application/helpers/mappersDTO';
import { validatorDTO } from 'application/helpers/validatorDTO';
import { organizationDTO } from 'modules/OrganizationModule/Organization/interfaces/organization.dto';
import { OrganizationStatusEntity } from '../domain/organizationStatus.entity';

export const organizationStatusDTO = new OrganizationStatusEntity();

export const organizationStatusMapper = (val: IPointStatusRequest) => {
  organizationStatusDTO.deliveryMetod = val.deliveryMetod;
  organizationStatusDTO.organization = val.organization;
  organizationStatusDTO.organizationStatus = val.organizationStatus;
  organizationStatusDTO.paymentMetod = val.paymentMetod;

  return { ...organizationStatusDTO };
};
