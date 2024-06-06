import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { City } from '../../../../entities/cities';
import { cityStore } from '../../store/city-store';

type Props = {
  city: City;
  onClick?: (city: City) => void;
};

export const CityButton: FC<Props> = observer(({ city, onClick }) => {
  const handleClick = () => {
    cityStore.setCity(city);

    onClick?.(city);
  };

  return (
    <span className="flex gap-2 items-center">
      <button
        onClick={handleClick}
        type="button"
        className="cursor-pointer border-0 bg-transparent p-0 font-tilda text-base hover:text-main"
      >
        {city.name}
      </button>
      <span className="text-secondary">{city.countOrg}</span>
    </span>
  );
});
