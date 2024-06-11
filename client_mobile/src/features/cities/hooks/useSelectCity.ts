import { ICity } from 'modules/CityModule/interfaces/city.type';
import { cityStore } from '..';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useNavigate } from 'react-router-dom';

export const useSelectCity = () => {
	const navigate = useNavigate();

	const handlerSelectCity = (city: ICity) => {
		cityStore.setCity(city);
		navigate(ROUTE_APP.POINT);
	};

	return { handlerSelectCity };
};
