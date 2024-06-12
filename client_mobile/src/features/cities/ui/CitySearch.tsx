import { handlerSerchCity } from 'entities/cities/queries/cities.handlers';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import { ChangeEvent, FC, ReactEventHandler } from 'react';
import { InputSearch } from 'shared/ui/components/input/Input/InputSearch';
import { includesWithLayout } from 'shared/utils/includesWithLayout';

const CitySearch: FC<{
	handlerSetCities: (cities: ICity[]) => void;
	cities: ICity[];
}> = ({ handlerSetCities, cities }) => {
	const filteredData = (searchValue: string, data: ICity[]) => {
		if (!searchValue) return data;

		return data.filter((city) =>
			includesWithLayout(
				city.cityname.toLowerCase(),
				searchValue.toLowerCase(),
			),
		);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		handlerSetCities(filteredData(value, cities));
	};

	return (
		<div className="sticky top-0 left-0 bg-white py-2">
			<InputSearch className="w-full" onChange={handleSearchChange} />
		</div>
	);
};
export default CitySearch;
