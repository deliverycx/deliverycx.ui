import {
  IRequestOrderUser,
  IRequestProfile,
  IUserOrders,
} from '../interfaces/profile.type';

export class ProfileEntity {
  existingProrfile(profile: IRequestProfile) {
    if (profile) {
      return profile;
    } else {
      return false;
    }
  }

  OrdersListBody(orders: IRequestOrderUser[]) {
    return orders.map((value) => {
      return {
        order: value,
        orderDelivery: value.orderParams.address
          ? {
              address: value.orderParams.address.street,
              house: value.orderParams.address.home,
              floor: value.orderParams.address.floor,
              entrance: value.orderParams.address.entrance,
              intercom: value.orderParams.address.intercom,
              flat: value.orderParams.address.flat,
              userid: value.user,
              city: value.orderParams.address.city,
              kladrid: value.orderParams.address.kladrid,
            }
          : null,
        orderBody: {
          comment: value.orderParams.comment,
          name: value.orderParams.name,
          phone: value.orderParams.phone,
          address: value.orderParams.address,
          payment: value.orderParams.paymentMethod,
          money: value.orderParams.money,
          timedelivery: value.orderParams.timedelivery,
        },
      };
    });
  }
}
