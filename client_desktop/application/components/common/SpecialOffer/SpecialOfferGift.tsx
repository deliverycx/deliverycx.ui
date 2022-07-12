import React, { FC } from "react";

const SpecialOfferFree:FC<{free:number}> = ({free}) => {
  return (
    <div className="special-offer-container">
      <div className="hink-free-container">
        <span className="hink-free"/>
      </div>
      <div className="text-container">
        <div className="hink-left-text">
          <div>{free !== 0 ? free : '1'} хинкали в подарок!</div>
          <span>Условия акции выполнены</span>
        </div>
        <span className="ok-icon"/>
      </div>
    </div>
  );
};

export default SpecialOfferFree;
