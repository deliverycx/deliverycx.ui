export interface ICategory {
    image: string;
    id: string;
    name: string;
		description:string
		order:number
}
export interface IProduct<C = ICategory> {
    id: string;
    name: string;
		productId:string
    description: string;
    additionalInfo: string;
    price: number;
    weight: number;
    measureUnit: string;
    image: string;
    categoryImage: string;
    isFav: boolean;
		category:string
}
export interface IFavorites {
    list: string[];
}
export interface IResponseProductCard {
    sauces: IProduct[];
    product: IProduct;
    group: ICategory;
}
export interface IStopList{
    organization: string,
    stopList: TStopListItems[]
}
export type TStopListItems = {
    balance: number,
    productId:string
		product:string
}