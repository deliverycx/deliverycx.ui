import { InjectableDI } from "application/helpers/dependencyInjection";
import { CityComandBus } from "./City.comandBus";

@InjectableDI()
export class CityQuery extends CityComandBus{

}