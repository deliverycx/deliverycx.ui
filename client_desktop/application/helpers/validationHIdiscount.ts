import { IReqCart } from "@types";
import { number } from "yup";

export const validationHIdiscount = (cart:IReqCart[]) =>{
	const regex = new RegExp('HI' + "-\\d+", "i");

	const {count,sum} = cart.reduce((acc:{count:number,sum:number[]},cartEl) =>{
		const tagIndex = cartEl.productTags
                    ? cartEl.productTags.findIndex((el) => el.match(regex))
                    : -1;


		if (cartEl.productTags && tagIndex !== -1) {

			return {
				count:acc.count + cartEl.amount,
				sum:[...acc.sum,cartEl.oneprice]
			}
			
			
		}else{
			return acc
		}							
		
	}, {
		count:0,
		sum:[]
	})

	let c = 0
	
		for (let i = 1; i <= count; i++) {
			
			if (i % 12 === 0) {
				c += 1
				
			}
		}

	return {
		count,
		free:c,
		min:Math.min(...sum)

	}

}