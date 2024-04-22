import { InjectableDI } from "application/helpers/dependencyInjection";
import { CityComandBus } from "./City.comandBus";

@InjectableDI()
export class CityHandlers extends CityComandBus{

}