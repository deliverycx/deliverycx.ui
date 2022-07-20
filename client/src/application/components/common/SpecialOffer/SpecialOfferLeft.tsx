
const SpecialOfferLeft = ({count}:any)  => {
  return (
    <div className="special-offer-container">
      <div className="hink-number-left">
        <span className="hink-offer"/>
        <span className="number">{count}</span>
      </div>
      <div className="hink-left-text">
        <div>хинкали осталось до ДЮЖИНЫ</div>
        <span>при заказе дюжины (12ти) вы платите за 11-ть!</span>
      </div>
    </div>
  );
};

export default SpecialOfferLeft;
