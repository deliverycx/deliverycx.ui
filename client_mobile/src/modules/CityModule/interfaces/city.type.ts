import { CityEntiti } from '../domain/city.entity';
import { cityDTO } from '../interfaces/city.dto';

export type ICityResponse = {
  id: string;
  name: string;
  isHidden: boolean;
  countOrg: number;
};

export type ICity = CityEntiti;
