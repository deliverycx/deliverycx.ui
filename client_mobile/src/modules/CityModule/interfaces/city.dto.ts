import { validatorDTO } from 'application/helpers/validatorDTO';
import { ICity, ICityResponse } from './city.type';
import {
  validate,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { mappersDTO } from 'application/helpers/mappersDTO';
import { CityEntiti } from '../domain/city.entity';

export const cityDTO = new CityEntiti();

/*
export const cityMapper = (p:ICityResponse[] | ICityResponse):CityDTO[] | CityDTO => {
	return mappersDTO<ICityResponse,CityDTO>(p,(val)=>{
		cityDTO.id = val.id
		cityDTO.isHidden = val.isHidden
		cityDTO.cityname = val.name
		cityDTO.countOrganization = val.countOrg

		validatorDTO(cityDTO)
		return {...cityDTO}
	})
	
}
**/
export const cityMapper = (val: ICityResponse) => {
  cityDTO.id = val.id;
  cityDTO.isHidden = val.isHidden;
  cityDTO.cityname = val.name;
  cityDTO.countOrganization = val.countOrg;

  return { ...cityDTO };
};
