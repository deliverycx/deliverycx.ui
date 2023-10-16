import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import * as profileType from "./profile.type";
import { validatorDTO } from "application/helpers/validatorDTO";

export class ProfileDTO{

	@IsString()
	@IsNotEmpty()
	userid!:string

	@IsOptional()
	personal!:profileType.IPersonal
}

export const profileDTO = new ProfileDTO()

export const profileMapper = (val: profileType.IRequestProfile): ProfileDTO => {
	
	profileDTO.userid = val.userid
	profileDTO.personal = val.personal
	validatorDTO(profileDTO)
	return { ...profileDTO }

}