import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as profileType from './profile.type';
import { validatorDTO } from 'application/helpers/validatorDTO';

export class ProfileDTO {
  @IsString()
  @IsNotEmpty()
  userid!: string;

  @IsOptional()
  personal!: profileType.IPersonal;

  @IsOptional()
  adressdelivery!: profileType.IAddressDelivery[];
}

export const profileDTO = new ProfileDTO();

export const profileMapper = (val: profileType.IRequestProfile): ProfileDTO => {
  profileDTO.userid = val.userid;
  profileDTO.personal = val.personal;
  profileDTO.adressdelivery = val.adressdelivery || [];
  validatorDTO(profileDTO);
  return { ...profileDTO };
};
