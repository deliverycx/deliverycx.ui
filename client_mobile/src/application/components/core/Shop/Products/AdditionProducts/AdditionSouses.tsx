import { shopUseCase } from 'modules/ShopModule/shop.module';
import { FC, useEffect, useState } from 'react';
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';

import { basketUseCase } from 'modules/BasketModule/basket.module';
import AdditionSousesProduct from './AdditionSousesProduct';

const AdditionSouses: FC<{ set: any; parent: IProduct }> = ({
  set,
  parent,
}) => {
  const [souses, setSouses] = useState<IProduct[] | null>(null);

  const getSous = async () => {
    try {
      const result = await shopUseCase.sousesProducts();
      result && setSouses(result);
    } catch (error) {
      console.log(error);
      setSouses(null);
    }
  };

  useEffect(() => {
    getSous();
  }, []);

  return (
    <div className="product__modal-additional">
      {souses && <h3>Добавить к заказу</h3>}
      {souses &&
        souses.map((product) => {
          return (
            product && (
              <AdditionSousesProduct
                key={product.id}
                product={product}
                parent={parent.id}
              />
            )
          );
        })}
    </div>
  );
};
export default AdditionSouses;
