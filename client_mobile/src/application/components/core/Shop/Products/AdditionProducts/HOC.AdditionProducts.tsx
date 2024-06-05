import { requestShopApi } from 'modules/ShopModule/data/shop.request';
import { IProduct } from 'modules/ShopModule/interfaces/shop.type';
import { shopModel, shopUseCase } from 'modules/ShopModule/shop.module';
import { FC, useEffect } from 'react';
import { useState } from 'react';
import cn from 'classnames';
import { CircularProgress } from '@mui/material';

import React from 'react';
import ImageLoader from 'react-imageloader';
import ProductCard from '../ProductCard';
import LoaderProduct from 'application/components/common/Loaders/loaderProduct';
import PoductListItem from '../PoductListItem';
import { observer } from 'mobx-react-lite';

const HOCAdditionProducts = () => {
  const [additionProducts, setAdditionProducts] = useState<IProduct[] | null>();
  const [modalProduct, setModalmodalProduct] = useState<IProduct | boolean>(
    false,
  );
  const { stopList } = shopModel;

  useEffect(() => {
    shopUseCase.additionProducts().then((data) => {
      data && data.length && setAdditionProducts(data);
    });
  }, []);

  return (
    <div className="basket__more">
      <h3 className="basket__more-title">Может, что‑нибудь ещё?</h3>
      <div className="basket__more__content">
        {additionProducts ? (
          additionProducts.map((product, index: number) => {
            return (
              product && (
                <PoductListItem
                  key={index}
                  product={product}
                  stoplist={stopList}
                  setModalmodalProduct={setModalmodalProduct}
                />
              )
            );
          })
        ) : (
          <LoaderProduct />
        )}
        {modalProduct && (
          <ProductCard
            setIsModalOpened={setModalmodalProduct}
            stoplist={stopList}
            product={modalProduct as IProduct}
          />
        )}
      </div>
    </div>
  );
};
export default observer(HOCAdditionProducts);
