import { orderModel, orderUseCase } from 'modules/OrderModule/order.module';
import React, { useEffect, useState } from 'react';

const BasketDevices = () => {
  const [count, setCount] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const { orderBody } = orderModel;

  useEffect(() => {
    if (count === 0) {
      setIsActive(false);
      setCount(1);
    }
    orderUseCase.setOrderBody({ ...orderBody, devices: count });
  }, [count]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);

    if (count < 1) {
      setCount(1);
      setIsActive(false);
    }
  };

  return (
    <div className="devices-container">
      <div className="devices-text">
        <span className="icon">
          <img src={require('assets/images/icons/vector.png')} alt="" />
        </span>
        <span className="label">Приборы</span>
      </div>

      {isActive && (
        <div className="counter">
          <div className="decrement" onClick={handleDecrement}>
            <img
              src={require('assets/images/icons/remove_black.png')}
              width={16}
              alt="remove"
            />
          </div>
          <div className="count">{count}</div>
          <div className="increment" onClick={handleIncrement}>
            <img
              src={require('assets/images/icons/add_black.png')}
              width={16}
              alt="add"
            />
          </div>
        </div>
      )}

      <div className={'toggle-block'}>
        <div
          className={`toggle-button ${isActive ? 'active' : ''}`}
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};

export default BasketDevices;
