import { mappersDTO } from 'application/helpers/mappersDTO';
import { validatorDTO } from 'application/helpers/validatorDTO';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsObject,
  IsArray,
  IsOptional,
} from 'class-validator';
import {
  IOrganizationResponse,
  OrganizationFilters,
} from './organization.type';
import { OrganizationEntity } from '../domain/organization.entity';

export const organizationDTO = new OrganizationEntity();

/*
export const organizationMapper = (p:IOrganizationResponse[] | IOrganizationResponse):OrganizationDTO[] | OrganizationDTO => {
	return mappersDTO<IOrganizationResponse,OrganizationDTO>(p,(val)=>{
		organizationDTO.id = val.id
		organizationDTO.guid = val.guid
		organizationDTO.temital =  val.terminal
		organizationDTO.info = {
			address:val.address,
			cords:val.cords,
			phone:	val.phone,
			city: val.city
		}
		organizationDTO.isHidden = val.isHidden
		organizationDTO.workTime = val.workTime
		organizationDTO.redirect = {
			redirectUrl:val.redirect,
			redirectON:val.redirectON
		}
		organizationDTO.delivery = val.delivMetod
		organizationDTO.gallery = val.gallery
		organizationDTO.filters = val.filters
		organizationDTO.reservetable = val.reservetable
		validatorDTO(organizationDTO)
		return {...organizationDTO}
	})
	
}
*/
export const organizationMapper = (val: IOrganizationResponse) => {
  organizationDTO.id = val.id;
  organizationDTO.guid = val.guid;
  organizationDTO.temital = val.terminal;
  organizationDTO.info = {
    address: val.address,
    cords: val.cords,
    phone: val.phone,
    city: val.city,
  };
  organizationDTO.isHidden = val.isHidden;
  organizationDTO.workTime = val.workTime;
  organizationDTO.redirect = {
    redirectUrl: val.redirect,
    redirectON: val.redirectON,
  };
  organizationDTO.delivery = val.delivMetod;
  organizationDTO.gallery = val.gallery;
  organizationDTO.filters = val.filters;
  organizationDTO.reservetable = val.reservetable;
  return { ...organizationDTO };
};
