import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { IUser, IUserGuest } from "./user.type"
import { mappersDTO } from "application/helpers/mappersDTO"
import { validatorDTO } from "application/helpers/validatorDTO"

export class UserDTO {
	@IsNotEmpty()
	id!: string

	@IsString()
	username!: string

	@IsString()
	@IsOptional()
	phone?: string
}

export const userDTO = new UserDTO()

export const userMapper = (val: IUserGuest): UserDTO => {
	userDTO.id = val.id
	userDTO.username = val.username
	userDTO.phone = val.phone

	validatorDTO(userDTO)
	return { ...userDTO }

}
