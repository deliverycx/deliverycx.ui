import { FC, useState } from 'react';
import OrderStatus from './OrderStatus';
import { IUserOrders } from 'modules/Profile/interfaces/profile.type';
import ModalCard from 'application/components/common/Modals/ModalCard';
import UserOrderCard from './UserOrderCard';
import { DELIVERY_METODS } from 'application/contstans/const.orgstatus';

const UserOrderList: FC<{ order: IUserOrders }> = ({ order }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      {isModalOpened && (
        <ModalCard setIsOpened={setIsModalOpened}>
          <UserOrderCard set={setIsModalOpened} data={order} />
        </ModalCard>
      )}
      <div
        onClick={() => setIsModalOpened(true)}
        className="orders__list__item"
      >
        <div className="orders__list__item__header">
          <div className="orders__list__item__header__info">
            <h3 className="orders__list__item__header__info-numb">
              Номер заказа: {order.order.orderNumber || 'не известен'}
            </h3>
            <div className="orders__list__item__header__info-date">
              {order.order.orderParams.date}
            </div>
          </div>
          <OrderStatus status={order.order.orderStatus} />
        </div>
        {order.order.orderParams.orderType === DELIVERY_METODS.COURIER ? (
          <div className="orders__list__item__delivery">
            <h3 className="orders__list__item__delivery-title">Доставка</h3>
            {order.order.orderParams.address && (
              <small className="orders__list__item__delivery-addresses">{`${order.order.orderParams.address.city}, ${order.order.orderParams.address.street},${order.order.orderParams.address.home}`}</small>
            )}
          </div>
        ) : order.order.orderParams.orderType === DELIVERY_METODS.PICKUP ? (
          <div className="orders__list__item__delivery">
            <h3 className="orders__list__item__delivery-title">Самовывоз</h3>
          </div>
        ) : order.order.orderParams.orderType === DELIVERY_METODS.ONSPOT ? (
          <div className="orders__list__item__delivery">
            <h3 className="orders__list__item__delivery-title">За столиком</h3>
          </div>
        ) : (
          ''
        )}

        <div className="orders__list__item__price">
          <h3>Сумма</h3>
          <div className="orders__list__item__price-cost price--cost">
            <h3>{order.order.orderParams.orderAmount || '0'} ₽</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserOrderList;
