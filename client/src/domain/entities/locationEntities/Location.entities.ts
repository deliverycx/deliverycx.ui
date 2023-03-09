import { ICity, IPoint, IPointStatus } from "@types"
import Entities from "../Entities"
import { CypressInitState } from "application/helpers/cypressHelper"

export interface ILocationEntities{
  city: ICity
  point:IPoint
	pointstatus:IPointStatus
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class LocationEntities extends Entities<ILocationEntities>{
  protected city = CypressInitState('city') || {}
  protected point = {}
	protected pointstatus = null
  constructor() {
    super()
    this.entities = {
      city: this.city,
      point:this.point,
			pointstatus:this.pointstatus
    }
  }

}
export default LocationEntities.getInstance(LocationEntities)