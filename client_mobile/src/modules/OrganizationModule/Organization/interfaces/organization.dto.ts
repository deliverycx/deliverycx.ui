import { mappersDTO } from "application/helpers/mappersDTO"
import { validatorDTO } from "application/helpers/validatorDTO"
import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsObject, IsArray, IsOptional } from "class-validator"
import { IOrganizationResponse, OrganizationFilters } from "./organization.type"

export class OrganizationDTO{

	@IsNotEmpty()
	id!:string

	@IsObject()
	info!:{
		address:string
		cords:number[]
		phone:	string
		city:	string
	}

	@IsBoolean()
	isHidden!:boolean

	@IsObject()
	redirect!:{
		redirectUrl:string
		redirectON:boolean
	}

	@IsNotEmpty()
	workTime!: string | string []
	
	@IsString()
	guid!:string

	@IsOptional()
	delivery!: string | null

	@IsArray()
	gallery!:string[] | []

	@IsBoolean()
	reservetable!:boolean
	
	filters!:OrganizationFilters[] | []
}
export const organizationDTO = new OrganizationDTO()

export const organizationMapper = (p:IOrganizationResponse[] | IOrganizationResponse):OrganizationDTO[] | OrganizationDTO => {
	return mappersDTO<IOrganizationResponse,OrganizationDTO>(p,(val)=>{
		organizationDTO.id = val.id
		organizationDTO.guid = val.guid
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