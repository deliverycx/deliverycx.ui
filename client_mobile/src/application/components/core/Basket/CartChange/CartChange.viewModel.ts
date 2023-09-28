/* eslint-disable prefer-const */

import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import { useMemo, useState } from 'react';
import debounce from "lodash.debounce";
import { basketUseCase } from 'modules/BasketModule/basket.module';
import { useEffect } from 'react';

export function CartChangeViewModel(this: any, product: IProduct) {
	const [error, setError] = useState<null | string>(null);
	const [changeCount, setChangeCount] = useState<number | string>(0)
	const [changeCartCount, setChangeCartCount] = useState<number | string>(0)

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
			setChangeCartCount(0)
			//debouncedChangeHandler({ id, count:1})
		}else{
			setChangeCartCount(count -1)
			setChangeCount(1)
			//debouncedChangeHandler({ id, count})
		}
	}

	const handlerAddCard = () =>{
		if(changeCartCount){
			const count = Number(changeCount)  + Number(changeCartCount)
			debouncedChangeHandler({ id:product.id, count:count})
		}else{
			basketUseCase.addtoCart(product, 1)
		}
		
	}
	

	this.data({
		changeCount,
		changeCartCount
	});
	this.handlers({
		changeCountHandler,
		setChangeCount,
		setChangeCartCount,
		handlerInputAmout,
		handlerInputAddAmout,
		handlerAddCard
	});
	this.status({

	});
}