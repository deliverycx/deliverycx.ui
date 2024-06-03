import { ICartProd } from 'modules/BasketModule/interfaces/basket.type';
import { useCartViewModel } from './Cart.viewModel';
import CartList from './CartList';
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { observer } from 'mobx-react-lite';
import LoaderProduct from 'application/components/common/Loaders/loaderProduct';
import { FC, memo, useContext, useState } from 'react';
import ModalCard from 'application/components/common/Modals/ModalCard';
import { BasketContext } from '../HOC.Basket.desc';

const HOCCart: FC<{ cart: ICartProd[] }> = ({ cart }) => {
  const useCase = useContext(BasketContext);
  const { select } = useCase.data;
  const { dispatchSelectCart, selectAllCart, removeSelectItems } =
    useCase.handlers;

  return (
    <>
      {cart ? (
        cart.map((value: ICartProd) => {
          return (
            <CartList
              key={value.id}
              select={select}
              choise={dispatchSelectCart}
              product={value}
            />
          );
        })
      ) : (
        <LoaderProduct />
      )}
    </>
  );
};
export default memo(HOCCart);
