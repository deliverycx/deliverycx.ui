import { DTOMapper } from 'shared/utils/dto';
import { citiesMapping } from '../utils/cities.mapper';
import { InjectableDI } from 'application/helpers/dependencyInjection';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import { deleteFalseFromArr } from '../utils/cities.servises';
import { citiesApi } from '..';

@InjectableDI()
export class CitiesRepository {


	@DTOMapper(citiesMapping)
	async getCities(cityName: string) {

		const { data } = await citiesApi.getAll(cityName);
		return deleteFalseFromArr(data) as unknown as ICity[];
	}
}
