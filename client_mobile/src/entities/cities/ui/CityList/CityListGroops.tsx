import { FC } from 'react';
import { useCityGroups } from '../../hooks/useCityGroups';
import { ICitys } from 'entities/cities/interface/cities.type';
import { filtredHiddenCity } from 'entities/cities/utils/cities.servises';

type Props = {
	citiesMap: ICitys[];
	handlerSelect: (city: ICitys) => void
};

const CityListGroops: FC<Props> = ({ citiesMap, handlerSelect }) => {
	const citiesGroops = useCityGroups(filtredHiddenCity(citiesMap));

	return (
		<ul className="flex-column flex gap-7">
			{citiesGroops &&
				citiesGroops.map(({ letter, cities }) => (
					<li className="flex gap-4 items-start" key={letter}>
						<span className="align-center flex h-10 w-10 justify-center text-base font-bold text-main">
							{letter}
						</span>
						<ul className="grid w-full grid-cols-3 gap-3">
							{cities.map((city: ICitys) => (
								<li className="flex gap-2 items-center" key={city.id}>
									<span className="flex gap-2 items-center">
										<button
											onClick={() => handlerSelect(city)}
											type="button"
											className="cursor-pointer border-0 bg-transparent p-0 font-tilda text-base hover:text-main"
										>
											{city.cityname}
										</button>
										<span className="text-secondary">
											{city.countOrganization}
										</span>
									</span>
								</li>
							))}
						</ul>
					</li>
				))}
		</ul>
	);
};
export default CityListGroops;
