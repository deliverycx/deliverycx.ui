import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrderFromViewModel } from './OrderForm.viewModel';
import { FormikProvider, useFormik } from 'formik';
import { OrderFormBuilder } from './view/OrderFormBuilder';
import schema from 'application/helpers/validationSchema';
import { FormBuilderTabsOrder } from './view/OrderFormBuilderTabs';
import { OrderFormPayMetods } from './view/OrderFormPayMetods';
import { DELIVERY_METODS } from 'application/contstans/const.orgstatus';
import { organizationStatusModel } from 'modules/OrganizationModule/organization.module';
import { useState, useEffect, useRef, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ROUTE_APP } from 'application/contstans/route.const';
import { NavLink } from 'react-router-dom';
import HOCOrderGeneral from '../OrderGeneral/HOC.OrderGeneral';
import OrderNotificate from '../view/OrderNotificate';
import HOCOrderMetods from '../OrderMetods/HOC.OrderMetods';

const HOCOrderForm: FC<{ paymentMetod: string[] }> = (paymentMetod) => {
  const useCase = adapterComponentUseCase(useOrderFromViewModel, paymentMetod);
  const { builder, formik } = useCase.data;
  const { error } = useCase.status;

  const [disable, setDisable] = useState(false);

  const formWrapper = new OrderFormBuilder(formik, useCase);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="order-form">
        <div className="order-placement__form">
          <HOCOrderMetods />
          {builder &&
            builder.current &&
            formWrapper.getInitinal(builder.current)}
        </div>
        <div className="order-placement_general">
          <div className="order-placement_general-desc">
            <HOCOrderGeneral errors={error} />
            {!disable && (
              <div className="order-placement__buttons">
                <input
                  disabled={formik.isSubmitting}
                  className="btn btn-md btn-red"
                  type="submit"
                  value="Всё верно, продолжить"
                />

                <NavLink
                  to={ROUTE_APP.CART.BASKET_MAIN}
                  className="btn btn-md btn-gray"
                >
                  Назад
                </NavLink>
                <NavLink
                  className="order-placement__buttons-link"
                  to={ROUTE_APP.PRAVORAZDEL}
                >
                  <div>
                    Продолжая, вы соглашаетесь на{' '}
                    <span>обработку персональных данных</span> и{' '}
                    <span>условия пользовательского соглашения</span>
                  </div>
                </NavLink>
              </div>
            )}
            <OrderNotificate disable={setDisable} />
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};
export default observer(HOCOrderForm);
