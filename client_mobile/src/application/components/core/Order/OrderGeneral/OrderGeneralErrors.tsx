import { FC } from "react"

const OrderGeneralErrors:FC<{error:string}> = ({error}) =>{
	return (
		<div className="errors">
			{
				error
			}
		</div>
	)
}
export default OrderGeneralErrors