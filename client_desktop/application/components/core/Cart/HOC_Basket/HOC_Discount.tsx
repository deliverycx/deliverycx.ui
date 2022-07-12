import { adapterComponentUseCase } from "adapters/adapterComponents"
import SpecialOfferFree from "application/components/common/SpecialOffer/SpecialOfferGift"
import SpecialOfferLeft from "application/components/common/SpecialOffer/SpecialOfferLeft"
import { useCartDiscountDzone } from "domain/use-case/useCaseCart"
import { memo } from "react"

const Discounts = () =>{
	/**/
	const useCaseCartDiscount = adapterComponentUseCase(useCartDiscountDzone)
	const {countDiscount} = useCaseCartDiscount.data

	return(
		<>
		{
			countDiscount !== 0 && (countDiscount >= 12 && <SpecialOfferFree/>)
		}
		{
			countDiscount !== 0 && (countDiscount < 12 && <SpecialOfferLeft count={countDiscount} />)
		}
		
		</>
	)
}
export default memo(Discounts)