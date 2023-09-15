/* eslint-disable prefer-const */
import { CityDTO } from "../interfaces/city.dto";
import { ICity, ICityResponse } from "../interfaces/city.type";


export class CityEntiti {

	existingCity(cityMap: ICityResponse[]) {
		return cityMap.filter((value: ICityResponse) => {
			return value && typeof value.name === "string" && value.isHidden == false
		})

	}

	sortByNameCity(cities: ICityResponse[]) {
		if (cities) {
			const sortedCities = cities.slice().sort((a: { name: string; }, b: { name: string; }) => a.name > b.name ? 1 : -1);

			let curr_inner = [sortedCities[0]], result = [curr_inner];

			for (let i = 1; i < sortedCities.length; i++) {
				if (sortedCities[i].name[0] != sortedCities[i - 1].name[0]) { // Первые буквы не равны?
					result.push(curr_inner = []); // Создается новый массив, добавляется в result
				} // curr начинает ссылаться на этот массив, элементы продолжат добавляться туда

				curr_inner.push(sortedCities[i]);
			}

			return result
		}

	}
}