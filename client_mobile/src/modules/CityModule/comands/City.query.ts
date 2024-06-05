import { InjectableDI } from 'application/helpers/dependencyInjection';
import { CityComandBus } from './City.comandBus';
import { CityRepository } from '../data/city.repository';
import { UseCaseCity } from '../useCase/city.useCase';
import { CityModel } from '../domain/city.model';

@InjectableDI([UseCaseCity, CityRepository, CityModel])
export class CityQuery extends CityComandBus {
  constructor(
    private readonly useCaseCity: UseCaseCity,
    private readonly cityRepository: CityRepository,
    private readonly cityModel: CityModel,
  ) {
    super();
  }

  async queryCityList(cityname: string) {
    try {
      const repository = await this.cityRepository.getCityRepository(cityname);

      const result = this.useCaseCity.getCityList(repository);
      const citys = this.useCaseCity.citySort(result);
      citys && this.cityModel.actionSetSityList(citys);
      return citys;
    } catch (error) {
      console.log(error);
    }
  }
}
