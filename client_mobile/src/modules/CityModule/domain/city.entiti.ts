import { CityDTO } from "../interfaces/city.dto";
import { ICityResponse } from "../interfaces/city.type";

export class CityEntiti {

	existingCity(cityMap:ICityResponse[] | ICityResponse){
		if(!Array.isArray(cityMap)){
			return []
		}else{
			return cityMap.map((val:ICityResponse)=>{
				if(!val.isHidden && val.name !== ''){
					return cityMap
				}
			})
		}
		
	}
}