import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useCartSmallButton } from "domain/use-case/useCaseCart"
import { FC } from "react"

/* eslint-disable react/no-unknown-property */

type IProps = {
  modal:any
}

const CartSmallButton:FC<IProps> = ({modal}) => {
  const useCaseCartButton = adapterComponentUseCase(useCartSmallButton)
  const { itemsCount, emptyCN } = useCaseCartButton.data
  const {linkHandler} = useCaseCartButton.handlers

  return (
        <div onClick={() => linkHandler(modal)} className={emptyCN}>
					{itemsCount > 0 && <div className="cart_coutn">{itemsCount}</div>}
					<span className="cart-icon"/>
				</div>
  )
}
export default CartSmallButton
