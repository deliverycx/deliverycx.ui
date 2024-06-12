import { DTOMapper } from 'shared/utils/dto';
import { IGetAllCitys } from '../api/cities.api';
import { CitysEntiti } from '../interface/cities.type';


export function citiesMapping(val: IGetAllCitys) {
	const cityDTO = new CitysEntiti()
	cityDTO.id = val.id;
	cityDTO.isHidden = val.isHidden;
	cityDTO.cityname = val.name;
	cityDTO.countOrganization = val.countOrg;

	return { ...cityDTO };
}
