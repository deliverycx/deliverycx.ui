export type IRequestNomeclature = {
  categoryes: ICategory[];
  products: IProduct[];
};

export interface ICategory {
  image: string;
  id: string;
  name: string;
  description: string;
  order: number;
}
export interface IProduct<C = ICategory> {
  id: string;
  name: string;
  productId: string;
  description: string;
  additionalInfo: string;
  price: number;
  weight: number;
  measureUnit: string;
  image: string;
  categoryImage: string;
  isFav: boolean;
  category: string;
  stoplist?: boolean;
}
export interface IFavorites {
  list: string[];
}
export interface IResponseProductCard {
  sauces: IProduct[];
  product: IProduct;
  group: ICategory;
}
export type IStopList = {
  balance: number;
  productId: string;
};
export type TStopListItems = {
  balance: number;
  productId: string;
  product: string;
};
