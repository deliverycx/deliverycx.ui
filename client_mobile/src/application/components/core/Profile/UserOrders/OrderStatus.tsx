import { FC } from 'react';

const OrderStatus: FC<{ status: string }> = ({ status }) => {
  const caseStatus = () => {
    switch (status) {
      case 'ERROR':
        return {
          text: 'Ошибка призаказе',
          styles: 'warning',
        };
      case 'Success':
        return {
          text: 'Заказ принят',
          styles: 'cooking',
        };
    }
  };

  return (
    <>
      <div
        className={`orders__list__item__header-status ${caseStatus()?.styles}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path fill="white" />
        </svg>
        {caseStatus()?.text}
      </div>
    </>
  );
};
export default OrderStatus;
