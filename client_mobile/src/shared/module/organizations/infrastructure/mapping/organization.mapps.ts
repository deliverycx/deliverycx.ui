import { OrganizationEntity } from "../../domain/entities/organization.entity";
import { IOrganizationResponse } from "../../interfaces/types/organization.type";


export const organizationDTO = new OrganizationEntity();

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
