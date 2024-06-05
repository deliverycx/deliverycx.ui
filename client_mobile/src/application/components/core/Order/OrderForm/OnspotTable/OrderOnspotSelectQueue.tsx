import { FC, useEffect } from 'react';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { orderUseCase } from 'modules/OrderModule/order.module';
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useCaseOrganizationStatus } from 'modules/OrganizationModule/organization.module';
import { DELIVERY_METODS } from 'application/contstans/const.orgstatus';

const OrderOnspotSelectQueue: FC<{ organization: IOrganization }> = ({
  organization,
}) => {
  const navigate = useNavigate();

  const cansel = () => {
    orderUseCase.setOnSpotTable(null);
    //useCaseOrganizationStatus.selectDeliveryMetod(null)
    navigate(ROUTE_APP.MAIN);
  };

  useEffect(() => {
    /*
		useCaseOrganizationStatus.selectDeliveryMetod({
			metod: DELIVERY_METODS.ONSPOT,
			name: "За столом",
			active: false,
			sort:3
		})
		*/
  }, []);

  return (
    <div className="d-flex flex-center gap-12">
      <div className="input__item input_icon input_icon_left input_icon_right flex-big">
        <label htmlFor="adresses-institut">Адрес заведения</label>
        <div className="input__container">
          <img
            src={require('assets/images/icons/location_gray_999.png')}
            alt=""
          />
          <input
            readOnly
            value={organization.info.address}
            name="adresses-institut"
            type=""
          />
        </div>
        <div className="canselqr" onClick={cansel}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3 5.71022C17.91 5.32022 17.28 5.32022 16.89 5.71022L12 10.5902L7.10997 5.70021C6.71997 5.31021 6.08997 5.31021 5.69997 5.70021C5.30997 6.09021 5.30997 6.72022 5.69997 7.11022L10.59 12.0002L5.69997 16.8902C5.30997 17.2802 5.30997 17.9102 5.69997 18.3002C6.08997 18.6902 6.71997 18.6902 7.10997 18.3002L12 13.4102L16.89 18.3002C17.28 18.6902 17.91 18.6902 18.3 18.3002C18.69 17.9102 18.69 17.2802 18.3 16.8902L13.41 12.0002L18.3 7.11022C18.68 6.73022 18.68 6.09022 18.3 5.71022Z"
              fill="#8D191D"
            />
          </svg>
          <span>отменить предварительный заказ</span>
        </div>
      </div>
    </div>
  );
};
export default OrderOnspotSelectQueue;
