import { ICity, IPoint, IPointStatus } from "@types"
import Entities from "../Entities"

export interface ILocationEntities{
  city: ICity
  point: IPoint,
	pointstatus:IPointStatus,
  locationModal:boolean
  locationMap:boolean
}
/**
 * @description синглтон
 * @method init полиморф, может не принимать аргументов или любой аргумент и изменяет entities
 */
class LocationEntities extends Entities<ILocationEntities>{
  protected city = {}
  protected point = {}
	protected pointstatus = null
  protected locationModal = false
  protected locationMap = false
  constructor() {
    super()
    this.entities = {
      city: this.city,
      point: this.point,
			pointstatus:this.pointstatus,
      locationModal: this.locationModal,
      locationMap:this.locationMap
    }
  }

}
export default LocationEntities.getInstance(LocationEntities)