import { ChangeEvent, FC, useState } from 'react';
import { useCityGroups } from '../../hooks/useCityGroups';
import { InputSearch } from 'shared/ui/InputSearch';
import { City } from '../../types/citiesTypes';

type Props = {
  onCityClick?: (city: City) => void;
};

export const CityList: FC<Props> = ({ onCityClick }) => {
  const [inputValue, setInputValue] = useState('');

  const cities = useCityGroups({
    searchValue: inputValue,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex-column flex gap-4 p-4 font-tilda">
      <div className="sticky top-0 left-0 bg-white py-2">
        <InputSearch
          className="w-full"
          value={inputValue}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="flex-column flex gap-7">
        {cities.map(({ letter, cities }) => (
          <li className="flex gap-4 items-start" key={letter}>
            <span className="align-center flex h-10 w-10 justify-center text-base font-bold text-main">
              {letter}
            </span>
            <ul className="grid w-full grid-cols-3 gap-3">
              {cities.map((city) => (
                <li className="flex gap-2 items-center" key={city.id}>
                  <button
                    type="button"
                    onClick={() => onCityClick?.(city)}
                    className="cursor-pointer border-0 bg-transparent p-0 font-tilda text-base hover:text-main"
                  >
                    {city.name}
                  </button>
                  <span className="text-secondary">{city.countOrg}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
