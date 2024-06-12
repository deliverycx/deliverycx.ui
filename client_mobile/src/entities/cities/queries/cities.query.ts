import { QueryClient, useQuery } from '@tanstack/react-query';
import { citiesRepository } from '..';

export const QUERY_CITY_KEY = 'CITIES';

export const fetchCities = (queryClient: QueryClient) => {
	return queryClient.fetchQuery({
		queryKey: [QUERY_CITY_KEY],
		queryFn: () => citiesRepository.getCities(''),
	});
};

export const hasCities = (queryClient: QueryClient) => {
	return !!queryClient.getQueryData([QUERY_CITY_KEY]);
};

export const useCitiesQuery = () => {
	return useQuery({
		queryKey: [QUERY_CITY_KEY],
		queryFn: () => citiesRepository.getCities('')
	});
};
