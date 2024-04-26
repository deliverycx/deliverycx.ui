
import { adapterResolveDI } from "application/helpers/dependencyInjection";
import { CityHandlers } from "./comands/City.handlers";
import { CityQuery } from "./comands/City.query";
import { CityModel } from "./domain/city.model";
import { CityComandBus } from "./comands/City.comandBus";




export const cityModel = new CityModel()
export const cityComandBus = new CityComandBus()
class CityModule{
	queryBus:CityQuery = adapterResolveDI(CityQuery)
	handlerBus:CityHandlers = adapterResolveDI(CityHandlers)
}
export const cityModule = new CityModule()