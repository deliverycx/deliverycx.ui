import { useMemo } from 'react';
import { useCitiesQuery } from '../queries/cities.query';
import { ICity } from 'modules/CityModule/interfaces/city.type';

export const useCityGroups = (cities?: ICity[]) => {

	const getMapOfGroupCities = (cityData: ICity[]) =>
		cityData.reduce(
			(acc: any, city: any) => {
				const firstLetter = city.cityname.charAt(0).toUpperCase();
				if (!acc[firstLetter]) {
					acc[firstLetter] = [];
				}
				acc[firstLetter].push(city);
				return acc;
			},
			{} as Record<string, ICity[]>,
		);

	const groop = useMemo(() => {
		return cities && Array.isArray(cities)
			? Object.entries(getMapOfGroupCities(cities))
				.map(([letter, cities]) => ({
					letter,
					cities: cities as ICity[],
				}))
				.sort((a, b) => a.letter.localeCompare(b.letter))
			: null;
	}, [cities]);



	return groop
};
