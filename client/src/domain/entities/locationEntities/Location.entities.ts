import { ICity, IPoint, thisWindow } from "@types"
import { CypressInitState } from "application/helpers/cypressHelper"
import Entities from "../Entities"

export interface ILocationEntities{
  city: ICity
  point:IPoint
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class LocationEntities extends Entities<ILocationEntities>{
  protected city = CypressInitState('city') || {}
  protected point = {}
  constructor() {
    super()
    this.entities = {
      city: this.city,
      point:this.point
    }
  }

}
export default LocationEntities.getInstance(LocationEntities)