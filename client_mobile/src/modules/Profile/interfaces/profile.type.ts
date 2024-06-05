import { IIkkoStreet } from 'application/components/common/Maps/DeliveryMap/DeliveryAdressSelect';
import { ProfileDTO } from './profile.dto';
import { ICartProd } from 'modules/BasketModule/interfaces/basket.type';
import {
  IInitialValues,
  IOrderOnspotTable,
} from 'modules/OrderModule/interfaces/order.type';

export type IRequestProfile = {
  userid: string;
  personal: IPersonal;
  adressdelivery: any;
};

export type IPersonal = {
  name: string;
  lastname: string;
  birthday: string;
  male: string;
  phone: string;
  email: string;
  spam: boolean;
};

export type IAddressDelivery = {
  address: string;
  house: string;
  floor: string;
  entrance: string;
  intercom: string;
  flat: string;
  userid?: string;
  city?: string;
  kladrid: null | IIkkoStreet;
};

export type IRequestOrderUser = {
  organization: string;
  orderNumber: number;
  orderHash: string;
  orderStatus: string;
  orderItems: ICartProd[];
  orderParams: {
    address: {
      city: string;
      street: string;
      home: string;
      flat: string;
      intercom: string;
      entrance: string;
      floor: string;
      kladrid: IIkkoStreet;
    };
    organization: string;
    name: string;
    date: string;
    phone: string;
    comment: string;
    localhost: string;
    hash: string;
    orderAmount: number;
    orderType: string;
    paymentMethod: string;
    orderTable: null | IOrderOnspotTable;
    timedelivery: string;
    money: number;
  };
  orderError: null | any;
  orderId: string;
  user: string;
};

export type IUserOrders = {
  order: IRequestOrderUser;
  orderDelivery: IAddressDelivery;
  orderBody: IInitialValues;
};

export type IProfile = ProfileDTO;
