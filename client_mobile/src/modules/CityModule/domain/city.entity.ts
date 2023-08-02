import { CityDTO } from "../interfaces/city.dto";
import { ICity, ICityResponse } from "../interfaces/city.type";


export class CityEntiti {

	existingCity(cityMap:ICityResponse[]){
		
		return cityMap.filter((value: ICityResponse) => {
			return value && typeof value.name === "string" && value.isHidden == false
		})
		
	}

	sumCityOrg(city:ICity[]){
		const result = city.reduce((acc,value:ICity,arr,array)=>{
			//console.log(array.length);
			acc.cityCoutn =+ array.length
			
			return acc
		},{
			cityCoutn:0,
			orgCount:0
		})
		return result
	}
}