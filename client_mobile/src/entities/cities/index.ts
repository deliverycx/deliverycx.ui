import { adapterResolveDI } from 'application/helpers/dependencyInjection';
import { CitiesApi } from './api/cities.api';
import { CitiesRepository } from './api/cities.repository';


export type { ICitys } from './interface/cities.type';


export const citiesApi: CitiesApi = adapterResolveDI(CitiesApi);
export const citiesRepository: CitiesRepository = adapterResolveDI(CitiesRepository);