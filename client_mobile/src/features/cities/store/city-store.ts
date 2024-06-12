import { action, makeObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { ICity } from 'modules/CityModule/interfaces/city.type';

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

	setCity(city: ICity) {
		this.cityId = city.id;
	}
}

export const cityStore = new CityStore();
