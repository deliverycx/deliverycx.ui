

import { CityModel } from "./domain/city.model";
import { UseCaseCity } from "./useCase/city.useCase";



export const cityModel = new CityModel()

export const useCaseCity = new UseCaseCity(
	cityModel
)