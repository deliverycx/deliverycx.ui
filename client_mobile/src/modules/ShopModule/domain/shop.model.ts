import { action, makeObservable, observable } from "mobx";
import { ShopRepository } from "../data/shop.repository";
import { ICategory, IStopList, TStopListItems } from 'modules/ShopModule/interfaces/shop.type';
import { makePersistable } from "mobx-persist-store";
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';

export class ShopModel extends ShopRepository{
	selectCategory:ICategory | null = null
	selectProduct:IProduct[] | null = null
	stopList:IStopList[] | null = null

	constructor() {
		super()
		makeObservable(this, {
			selectCategory:observable,
			selectProduct:observable,
			stopList:observable,
			actionSelectCategory: action,
			actionSelectProduct:action,
			actionStopList:action
		})
		makePersistable(this, { name: 'Category', properties: ['selectCategory'],storage: window.localStorage });
	}

	actionSelectCategory(category:ICategory | null){
		this.selectCategory = category
	}

	actionSelectProduct(pointid:string,product:IProduct[]){		
		if(pointid){
			
			this.selectProduct = product
			this.reposityStoplist(pointid).subscribe((data: IStopList[]) => {
				this.stopList = data
			})
		}else{
			this.stopList = null
		}
		
		
	}
	actionStopList(pointid:string){
		if(pointid){
			this.reposityStoplist(pointid).subscribe((data: IStopList[]) => {
				this.stopList = data
			})
		}else{
			this.stopList = null
		}
	}
}