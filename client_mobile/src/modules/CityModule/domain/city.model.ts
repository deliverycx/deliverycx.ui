import { action, computed, configure, makeObservable, observable } from 'mobx';
import { cityDTO } from '../interfaces/city.dto';
import { CityRepository } from '../data/city.repository';
import { makePersistable } from 'mobx-persist-store';
import { ICity } from 'modules/CityModule/interfaces/city.type';
import { CityEntiti } from './city.entity';
import { InjectableDI } from 'application/helpers/dependencyInjection';

@InjectableDI()
export class CityModel {
  cityList: Array<ICity> = [];
  selectCity: CityEntiti | null = null;

  constructor() {
    makeObservable(this, {
      cityList: observable,
      selectCity: observable,
      actionSetSityList: action,
      actionSelectSity: action,
    });
    makePersistable(this, {
      name: 'city',
      properties: ['selectCity'],
      storage: window.localStorage,
    });
  }

  actionSetSityList(citys: ICity[] | []) {
    this.cityList = citys;
  }

  actionSelectSity(city: ICity) {
    this.selectCity = city;
  }
}
