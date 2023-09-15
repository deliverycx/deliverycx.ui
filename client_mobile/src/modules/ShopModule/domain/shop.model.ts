import { action, makeObservable, observable } from "mobx";
import { ShopRepository } from "../data/shop.repository";
import { ICategory } from 'modules/ShopModule/interfaces/shop.type';
import { makePersistable } from "mobx-persist-store";

export class ShopModel extends ShopRepository{
	selectCategory:ICategory | null = null

	constructor() {
		super()
		makeObservable(this, {
			selectCategory:observable,
			actionSelectCategory: action,
		})
		makePersistable(this, { name: 'Category', properties: ['selectCategory'],storage: window.localStorage });
	}

	actionSelectCategory(category:ICategory){
		this.selectCategory = category
	}
}