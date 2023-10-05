import { action, makeObservable, observable } from "mobx";
import { ShopRepository } from "../data/shop.repository";
import { ICategory, IStopList } from 'modules/ShopModule/interfaces/shop.type';
import { makePersistable } from "mobx-persist-store";
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';

export class ShopModel extends ShopRepository{
	selectCategory:ICategory | null = null
	selectProduct:IProduct[] | null = null

	constructor() {
		super()
		makeObservable(this, {
			selectCategory:observable,
			selectProduct:observable,
			actionSelectCategory: action,
			actionSelectProduct:action
		})
		makePersistable(this, { name: 'Category', properties: ['selectCategory'],storage: window.localStorage });
	}

	actionSelectCategory(category:ICategory | null){
		this.selectCategory = category
	}

	actionSelectProduct(products:IProduct[],pointid:string){
		
		if(products && products.length){
			this.reposityStoplist(pointid).subscribe((data: IStopList[]) => {
				this.selectProduct = this.filterStopList(products,data)
			})
		}else{
			this.selectProduct = null
		}
		
	}
}