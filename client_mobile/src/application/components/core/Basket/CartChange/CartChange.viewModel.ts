/* eslint-disable prefer-const */

import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import { useMemo, useRef, useState } from 'react';
import debounce from "lodash.debounce";
import { basketModel, basketUseCase } from 'modules/BasketModule/basket.module';
import { useEffect } from 'react';
import { isDesctomMediaQuery } from 'application/ResponseMedia';
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { useMediaRedirectPoint } from 'application/hooks/useMediaRedirectPoint';
import { useSpring, animated, config } from 'react-spring'
import { shopModel } from 'modules/ShopModule/shop.module';

export function CartChangeViewModel(this: any, product: IProduct) {
	const { basketPrice, cart, cartAddional } = basketModel
	const [error, setError] = useState<null | string>(null);
	const [changeCount, setChangeCount] = useState<number | string>(0)
	const [changeCartCount, setChangeCartCount] = useState<number | string>(0)
	const [prodInCart, setProdInCart] = useState(false)

	const { redirectToDectPoints } = useMediaRedirectPoint()

	useEffect(() => {
		const cartid = basketUseCase.findIdCart(product.productId)
		if (cartid && cartid.productId === product.productId) {
			setChangeCount(cartid.anmout)
		} else {
			setChangeCount(0)
		}
	}, [cart, product.productId])

	//console.log('prodInCart',product.name);
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

					setChangeCount(prev => {
						let count = Number(prev) - 1
						debouncedChangeHandler({ id, count })
						return count
					});
					/*
					if (!(changeCount <= 1)) {
						setChangeCount(prev => {
							let count = Number(prev) - 1
							debouncedChangeHandler({ id, count })
							return count
						});
					}
					*/
					break;
				default: setChangeCount(0)
			}

		} else {
			setChangeCount(prev => {

				debouncedChangeHandler({ id, count: 1 })
				return 1
			})
		}
	}



	const handlerInputAmout = (id: string, count: number) => {
		if (count === 0) {
			setChangeCount('')
		} else {
			setChangeCount(count)
			debouncedChangeHandler({ id, count })
		}
	}

	const handlerInputAddAmout = (id: string, count: number) => {
		if (count === 0) {
			setChangeCartCount(0)
			//debouncedChangeHandler({ id, count:1})
		} else {
			setChangeCartCount(count - 1)
			setChangeCount(1)
			//debouncedChangeHandler({ id, count})
		}
	}

	const handlerAddCard = () => {
		redirectToDectPoints()
		if (changeCartCount) {
			const count = Number(changeCount) + Number(changeCartCount)
			debouncedChangeHandler({ id: product.id, count: count })
		} else {
			basketUseCase.addtoCart(product, 1)
		}

	}

	const handlerAddProd = (product: IProduct) => {
		redirectToDectPoints()
		basketUseCase.addtoCart(product)
	}


	const countSous = (product: IProduct) =>{
		const findProdSous = cartAddional.reduce((acc,value) =>{
			if(value.parentid === product.productId){
				return acc += value.amount * value.count
			}
			return acc
		},0)
	
		return findProdSous
	}


	/*
	const findCartProduct = () =>{
		const prodincart = cart && cart.find((value) =>{
			console.log(value.productId,product.id);
			value.productId === product.id
		})
		prodincart && setProdInCart(true)
	}
	*/

	this.data({
		changeCount,
		changeCartCount,
		basketPrice,
		prodInCart,
		cartAddional
	});
	this.handlers({
		changeCountHandler,
		setChangeCount,
		setChangeCartCount,
		handlerInputAmout,
		handlerInputAddAmout,
		handlerAddCard,
		handlerAddProd,
		countSous
	});
	this.status({

	});
}

export function CartChangeAnimateViewModel(this: any,) {
	const { selectCategory } = shopModel
	const { cart } = basketModel
	const descQuery = isDesctomMediaQuery()

	const springRef = useRef<any>();
	let queryCartRef = useRef<any>();
	const [style, animate] = useSpring(() => ({
		x: 0,
		y: 0,
		opacity: 0,
		config: { duration: 750, mass: 1, tension: 2000, friction: 2700 },
	}));
	const root = document.querySelector("#root") as HTMLElement;
	const AnimateHandle = () => {
		try {
			if (springRef.current && queryCartRef.current && root) {
				
				
					
				animate({
					x:
						descQuery
							? - ((springRef.current.offsetLeft - queryCartRef.current.offsetLeft) - 70)
							: - ( (springRef.current.offsetLeft - 280)),
					y:
						descQuery
							? - (springRef.current.offsetTop - (queryCartRef.current.offsetTop + root.scrollTop) - (110 * Number(cart && cart.length < 4 ? cart.length : 0)))
							: - (springRef.current.offsetTop - (queryCartRef.current.offsetTop + window.pageYOffset) + 30),
					opacity: 1,
					loop: {
						x: 0,
						y: 0,
						opacity: 0,
						immediate: true,
					}
				})
			} else {
				throw Error();
			}

		} catch (e) {
			console.log(e)
		}


		//addCart(id)
	}

	useEffect(() => {
		queryCartRef.current = document.querySelector('.link-to-cart') as HTMLElement;
	}, [])


	this.data({
		springRef,
		style,
		selectCategory
	});
	this.handlers({
		AnimateHandle
	});
	this.status({

	});

}