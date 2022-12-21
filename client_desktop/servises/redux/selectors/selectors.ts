import { IBankCard, ICart, ICategory, ICity, IPoint, IPointStatus, IProfile, IStopList, TStopListItems } from "@types";
import { AdapterSelector } from "adapters/adapterStore";
import { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { RootState } from "../createStore";



interface Iselectors {
  category: (state: RootState) => ICategory
  point: (state: RootState) => IPoint,
	pointstatus:(state: RootState) => IPointStatus,
  city: (state: RootState) => ICity,
  shop: (state: RootState) => IShopEntities,
  stoplist: (state: RootState) => TStopListItems[],
  cart: (state: RootState) => ICart,
  bankcard:(state: RootState) => IBankCard
}
const selectors:Iselectors = {
  point: (state) => state.location.point,
  city: (state) => state.location.city,
	pointstatus:(state) => state.location.pointstatus,
  category: (state) => state.shop.category,
  shop: (state) => state.shop,
  stoplist: (state) => state.shop.stoplist,
  cart: (state) => state.cart,
  bankcard: (state) => state.bankcard
}
export const adapterSelector = new AdapterSelector<Iselectors>(selectors)
