import { IRequestNomeclature, IStopList } from "../interfaces/shop.type";
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';

export class ShopEntiti {
	existingNomenclature(nomeclature:IRequestNomeclature){
		if(nomeclature.categoryes && nomeclature.products){
			return nomeclature
		}
		return false
	}

	filterProductsBuCategory(products:IProduct[],catid:string):IProduct[]{
		return products.filter((product:IProduct) =>{
			//product.isFav = true
			return product.category === catid
		})
	}

	filterHiddenProducts(products:IProduct[],hiddenProduct:string[]){
		const filteredProducts = products.filter((product: any) => {
			return !hiddenProduct.includes(product.id);
		});
		return filteredProducts
	}

	filterStopList(products:IProduct[],stopList:IStopList[]){
		const list = stopList.reduce( (a:any,c,i) => {a.push(c.productId); return a} , []);
		return products.map((prod) => {
			if(list.includes(prod.productId)){
				return {...prod,stoplist:true}
			}
			return prod
		})
	}
}