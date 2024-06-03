import { observer } from 'mobx-react-lite';
import OrderMetodsTabs from './OrderMetodsTabs';
import {
  organizationModel,
  organizationStatusModel,
  organizationStatusModule,
  useCaseOrganizationStatus,
} from 'modules/OrganizationModule/organization.module';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { basketUseCase } from 'modules/BasketModule/basket.module';
import { useQuery } from 'react-query';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';

const HOCOrderMetods = () => {
  const { deliveryTipe, selectDeliveryTipe, organizationStatusMetods } =
    organizationStatusModel;

  return <>{deliveryTipe && <OrderMetodsTabs />}</>;
};
export default observer(HOCOrderMetods);
