import CityListGroops from 'entities/cities/ui/CityList/CityListGroops';
import { useSelectCity } from 'features/cities/hooks/useSelectCity';
import CitySearch from 'features/cities/ui/CitySearch';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import { FC, useState } from 'react';

const CitiesList: FC<{ cities: ICity[] }> = ({ cities }) => {
	const [citiesList, setSitiesList] = useState(cities);
	const { handlerSelectCity } = useSelectCity();

	return (
		<div className="flex-column flex gap-4 p-4 font-tilda">
			<CitySearch handlerSetCities={setSitiesList} cities={cities} />
			<CityListGroops
				citiesMap={citiesList}
				handlerSelect={handlerSelectCity}
			/>
		</div>
	);
};
export default CitiesList;
