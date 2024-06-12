import { ICity } from "modules/CityModule/interfaces/city.type"

export const filtredHiddenCity = (cityMap: ICity[] | undefined) => {
	if (cityMap && Array.isArray(cityMap)) {
		return cityMap.filter((value) => {
			return value && typeof value.cityname === 'string' && value.isHidden == false;
		});
	}
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const deleteFalseFromArr = <T extends unknown>(arr: T[]) => {
	return arr.filter((item) => item !== false);
};