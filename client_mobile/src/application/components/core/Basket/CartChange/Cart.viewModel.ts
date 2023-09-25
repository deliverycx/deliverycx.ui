/* eslint-disable prefer-const */

import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import { useMemo, useState } from 'react';
import debounce from "lodash.debounce";
import { basketUseCase } from 'modules/BasketModule/basket.module';
import { useEffect } from 'react';

export function CartChangeViewModel(this: any, product: IProduct) {
	const [error, setError] = useState<null | string>(null);
	const [changeCount, setChangeCount] = useState<number | string>(0)

	useEffect(()=>{
		const cartid = basketUseCase.findIdCart(product.productId)
		if(cartid){
			setChangeCount(cartid.anmout)
		}
	},[basketUseCase.basketModel.cart])


	const debouncedChangeHandler = useMemo(() => debounce(({ id, count }: any) => {
		basketUseCase.changeAmountCart(id, count)
	}), [])


	const changeCountHandler = ({ id, type, code }: any) => {

		if (typeof changeCount === 'number') {
			switch (type) {
				case 'inc':
					setChangeCount(prev => {
						console.log(prev);
						let count = typeof prev === 'number' ? prev + 1 : 1
						debouncedChangeHandler({ id, count })
						return count
					});
					break;
				case 'dec':
					if (!(changeCount <= 1)) {
						setChangeCount(prev => {
							let count = Number(prev) - 1
							debouncedChangeHandler({ id, count })
							return count
						});
					}
					break;
				default: setChangeCount(0)
			}
			
		}else{
			setChangeCount(prev => {
				
				debouncedChangeHandler({ id, count:1 })
				return 1
			})
		}
	}
	

	const handlerInputAmout = (id:string,count:number) =>{
		if(count === 0){
			setChangeCount('')
		}else{
			setChangeCount(count)
			debouncedChangeHandler({ id, count})
		}
	}

	const handlerInputAddAmout = (id:string,count:number) =>{
		if(count === 0){
			setChangeCount('')
			//debouncedChangeHandler({ id, count:1})
		}else{
			setChangeCount(count)
			//debouncedChangeHandler({ id, count})
		}
	}
	

	this.data({
		changeCount
	});
	this.handlers({
		changeCountHandler,
		handlerInputAmout,
		handlerInputAddAmout
	});
	this.status({

	});
}