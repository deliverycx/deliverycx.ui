import { basketUseCase } from "modules/BasketModule/basket.module";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { ICartProd } from "modules/BasketModule/interfaces/basket.type";


export function useCartViewModel(this: any) {
	const [select, setSelect] = useState<string[]>([])
	const navigate = useNavigate()
	const { cart, basketPrice } = basketUseCase.basketModel

	const dispatchSelectCart = (e:any, id: string) => {
		if (e.target.checked) {
			setSelect([...select, id]);
		} else {
			setSelect(select.filter((item) => item !== id));
		}
	}

	const selectAllCart = (e:any) =>{
		if (e.target.checked) {
			if(cart){
				const res = cart.reduce((accumulator:any, currentValue:any) => {
					
					return [...accumulator,currentValue.id]
				}, [])
				setSelect(res)
			}
		} else {
			setSelect([])
		}
		
		
	}


	const removeSelectItems = () =>{
		if(select.length){
			select.forEach((id)=>{
				basketUseCase.removeOneCart(id)
			})
		}
	}

	

	useEffect(()=>{
		if(!cart || cart.length === 0){
			navigate(ROUTE_APP.SHOP.SHOP_MAIN)
		}
	},[cart])

	useEffect(() => {
		basketUseCase.cartCase().then(data => {
			if (!data && !Array.isArray(data)) {
				navigate(ROUTE_APP.SHOP.SHOP_MAIN)
			}
		})
	}, [])
	

	this.data({
		cart,
		basketPrice,
		select
	});
	this.handlers({
		dispatchSelectCart,
		selectAllCart,
		removeSelectItems
	});
	this.status({

	});
}

