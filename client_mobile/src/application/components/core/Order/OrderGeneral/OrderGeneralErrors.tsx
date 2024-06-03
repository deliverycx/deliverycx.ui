import { FC } from 'react';

const OrderGeneralErrors: FC<{ error: string }> = ({ error }) => {
  return (
    <div className="order_errors">
      <h4>Ошибка при заказе</h4>
      {error}
    </div>
  );
};
export default OrderGeneralErrors;
