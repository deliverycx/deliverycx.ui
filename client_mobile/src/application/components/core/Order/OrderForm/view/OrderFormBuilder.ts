import {
  IWrapper,
  OrderFormWrapper,
} from 'application/components/core/Order/OrderForm/view/OrderFormWrapper';
import React, { ReactNode } from 'react';

export class OrderFormBuilder {
  protected wrapp: IWrapper;
  constructor(fromik: any, usecase: any) {
    this.wrapp = OrderFormWrapper(fromik, usecase);
  }
  createBuild(wrappers: IWrapper[]) {
    return wrappers.map((wrapp: any, index: number) => {
      return React.createElement(React.Fragment, { key: index }, wrapp);
    });
  }
  getInitinal(build: (builder: IWrapper) => IWrapper[]) {
    return React.createElement(
      React.Fragment,
      null,
      this.createBuild(build(this.wrapp)),
    );
  }
}
