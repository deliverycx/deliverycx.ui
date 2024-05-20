
import { adapterResolveDI } from "application/helpers/dependencyInjection";
import { CityHandlers } from "./comands/City.handlers";
import { CityQuery } from "./comands/City.query";
import { CityModel } from "./domain/city.model";






class CityModule{
	queryBus:CityQuery = adapterResolveDI(CityQuery)
	handlerBus:CityHandlers = adapterResolveDI(CityHandlers)
	cityModel:CityModel = adapterResolveDI(CityModel)
}

export const cityModule = new CityModule()
export const {cityModel} = cityModule