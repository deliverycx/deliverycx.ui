import { action, makeObservable } from 'mobx';
import { City } from '../../../entities/cities';
import { makePersistable } from 'mobx-persist-store';

class CityStore {
  cityId: string | null = null;

  constructor() {
    makeObservable(this, {
      setCity: action,
    });

    makePersistable(this, {
      name: 'CityStore',
      properties: ['cityId'],
      storage: window.localStorage,
    });
  }

  setCity(city: City) {
    this.cityId = city.id;
  }
}

export const cityStore = new CityStore();
