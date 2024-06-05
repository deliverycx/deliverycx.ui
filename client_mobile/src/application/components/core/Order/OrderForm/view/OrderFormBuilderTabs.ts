import { IOrderFormPayMetods } from './OrderFormPayMetods';
import { IWrapper } from './OrderFormWrapper';
import { ReactNode } from 'react';

export class FormBuilderTabsOrder {
  static delivery(metods: IOrderFormPayMetods) {
    return (builder: IWrapper): ReactNode[] => {
      //console.log('build delivery',builder);
      return [
        //builder.paymentPopup(),
        builder.deliveryTime(),
        builder.selectdeliv(),
        //builder.adress(),
        builder.comment(),
        builder.name(),
        builder.phone(),

        builder.payment(metods.paymentsMetod),
      ];
    };
  }
  static pickup(metods: IOrderFormPayMetods) {
    return (builder: IWrapper): ReactNode[] => {
      //console.log('build pickup',builder);
      return [
        //builder.paymentPopup(),
        //builder.payment(metods.paymentsMetod),
        //builder.adress(),
        builder.deliveryTime(),
        builder.comment(),
        builder.name(),
        builder.phone(),
      ];
    };
  }
  static onspot(metods: IOrderFormPayMetods) {
    return (builder: IWrapper): ReactNode[] => {
      //console.log('build onspot',builder);
      return [builder.onspotSelect(), builder.name(), builder.phone()];
    };
  }
}
