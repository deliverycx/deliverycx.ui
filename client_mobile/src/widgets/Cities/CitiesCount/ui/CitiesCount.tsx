/* eslint-disable prefer-const */
import { ICity } from 'modules/CityModule/interfaces/city.type';
import { useState, useEffect, FC } from 'react';

const CitiesCount: FC<{ cities: ICity[] }> = ({ cities }) => {
	const [coutCity, setCoutCity] = useState<{
		cityCoutn: number;
		orgCount: number;
	} | null>(null);

	const sumCity = async () => {
		const result = cities.reduce(
			(acc, value, arr, array) => {
				//console.log(acc,value.countOrg);
				acc.cityCoutn = array.length;
				if (value.countOrganization) {
					acc.orgCount += value.countOrganization;
				}

				return acc;
			},
			{
				cityCoutn: 0,
				orgCount: 0,
			},
		);
		setCoutCity(result);
	};

	useEffect(() => {
		cities && sumCity();
	}, [cities]);

	const countSities = (number: number) => {
		let last_num: any;
		if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'ных';
		last_num = number % 10;
		if (last_num == 1) return 'ная';
		if ([2, 3, 4].includes(last_num)) return 'ных';
		if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'ных';
	};

	return (
		<>
			{coutCity && (
				<div className="select__title">
					{coutCity.orgCount - 1} хинкаль{countSities(coutCity.orgCount - 1)} в{' '}
					{coutCity.cityCoutn} городах
				</div>
			)}
		</>
	);
};
export default CitiesCount;
