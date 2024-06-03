import { InjectableDI } from 'application/helpers/dependencyInjection';
import { CityComandBus } from './City.comandBus';
import { UseCaseCity } from '../useCase/city.useCase';
import { CityRepository } from '../data/city.repository';
import { ICity } from '../interfaces/city.type';

@InjectableDI([UseCaseCity, CityRepository])
export class CityHandlers extends CityComandBus {
  constructor(
    private readonly useCaseCity: UseCaseCity,
    private readonly cityRepository: CityRepository,
  ) {
    super();
  }
}
