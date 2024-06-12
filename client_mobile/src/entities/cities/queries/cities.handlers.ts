import { useMutation, useQueryClient } from "@tanstack/react-query";
import { citiesRepository } from "..";
import { QUERY_CITY_KEY } from "./cities.query";

const queryClient = useQueryClient()

export const handlerSerchCity = (cityName: string) => {
	return useMutation({
		mutationFn: () => citiesRepository.getCities(cityName || ''),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_CITY_KEY] })
		},
	})
}