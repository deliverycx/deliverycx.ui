import { useMemo } from 'react';
import { useCitiesQuery } from '../queries/citiesQueries';
import { City } from '../types/citiesTypes';
import { includesWithLayout } from 'shared/utils/includesWithLayout';

type Options = {
  searchValue?: string;
};

export const useCityGroups = (options?: Options) => {
  const { data } = useCitiesQuery();

  const { searchValue } = options ?? {};

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchValue) return data;

    return data.filter((city) =>
      includesWithLayout(city.name.toLowerCase(), searchValue.toLowerCase()),
    );
  }, [data, searchValue]);

  return useMemo(() => {
    const getMapOfGroupCities = filteredData.reduce(
      (acc, city) => {
        const firstLetter = city.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(city);
        return acc;
      },
      {} as Record<string, City[]>,
    );

    return Object.entries(getMapOfGroupCities)
      .map(([letter, cities]) => ({
        letter,
        cities,
      }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, [filteredData]);
};
