import { IsNotEmpty, IsString, isArray } from "class-validator"
import { IPointStatusRequest } from "./organizationStatus.type"
import { mappersDTO } from "application/helpers/mappersDTO"
import { validatorDTO } from "application/helpers/validatorDTO"
import { organizationDTO } from "modules/OrganizationModule/Organization/interfaces/organization.dto"

export class OrganizationStatusDTO{
	@IsNotEmpty()
	@IsString()
	organization!:string

	@IsNotEmpty()
	deliveryMetod!:string[]

	@IsNotEmpty()
	paymentMetod!:string[]

	@IsNotEmpty()
	@IsString()
	organizationStatus!:string

	
}


export const organizationStatusDTO = new OrganizationStatusDTO()

export const organizationStatusMapper = (p:IPointStatusRequest):OrganizationStatusDTO | OrganizationStatusDTO[] => {
	return mappersDTO<IPointStatusRequest,OrganizationStatusDTO>(p,(val)=>{
		organizationStatusDTO.deliveryMetod = val.deliveryMetod
		organizationStatusDTO.organization = val.organization
		organizationStatusDTO.organizationStatus = val.organizationStatus
		organizationStatusDTO.paymentMetod =  val.paymentMetod

		validatorDTO(organizationStatusDTO)
		return {...organizationStatusDTO}
	})
	
}