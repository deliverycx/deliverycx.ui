import { InjectableDI } from "application/helpers/dependencyInjection";
import { ICity, ICityResponse } from "../interfaces/city.type";

@InjectableDI()
export class CityServises{

	existingCity(cityMap: ICityResponse[]) {
		return cityMap.filter((value) => {
			return value && typeof value.name === "string" && value.isHidden == false
		})

	}

	sortByNameCity(cities: ICity[]):any {
		if (cities) {
			const sortedCities = cities.slice().sort((a: {cityname : string; }, b: { cityname: string; }) => a.cityname > b.cityname ? 1 : -1);

			let curr_inner = [sortedCities[0]], result = [curr_inner];

			for (let i = 1; i < sortedCities.length; i++) {
				if (sortedCities[i].cityname[0] != sortedCities[i - 1].cityname[0]) { // Первые буквы не равны?
					result.push(curr_inner = []); // Создается новый массив, добавляется в result
				} // curr начинает ссылаться на этот массив, элементы продолжат добавляться туда

				curr_inner.push(sortedCities[i]);
			}

			return result
		}else {
			return []
		}

	}
}