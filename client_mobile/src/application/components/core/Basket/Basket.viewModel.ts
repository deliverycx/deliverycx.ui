/* eslint-disable prefer-const */

import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import { useMemo, useState } from 'react';
import debounce from "lodash.debounce";
import { basketUseCase } from 'modules/BasketModule/basket.module';

export function BasketCountViewModel(this: any, product: IProduct) {
	const [error, setError] = useState<null | string>(null);
	const [changeCount, setChangeCount] = useState<number>(1)

	const debouncedChangeHandler = useMemo(() => debounce(({ id, count }: any) => {
		basketUseCase.changeAmountBasket(id, count)
	}), [])


	const changeCountHandler = ({ id, type, code }: any) => {
		if (typeof changeCount === 'number') {
			switch (type) {
				case 'inc':
					setChangeCount(prev => {
						let count = prev + 1
						debouncedChangeHandler({ id, count })
						return count
					});
					break;
				case 'dec':
					if (!(changeCount <= 1)) {
						setChangeCount(prev => {
							let count = prev - 1
							debouncedChangeHandler({ id, count })
							return count
						});
					}
					break;
				default: setChangeCount(1)
			}
			setError(null)
		}
	}


	console.log(changeCount);

	this.data({
		changeCount
	});
	this.handlers({
		changeCountHandler
	});
	this.status({

	});
}