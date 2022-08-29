import { addToCart } from "servises/repository/Axios/Interactor";
import { actionThunkBuilder, thunk } from "../actionThunkBuilder";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../createStore";
import { RequestCart } from "../../../repository/Axios/Request";
import { addCart, setTotalPrice } from "../../slice/cartSlice";

const helperOrderType = (getState: any) : {orderType:string,organization:string} => {
  const state = getState() as RootState
  return {orderType:state.cart.orderType,organization:state.location.point.guid}
}

export default class actionThunkCart extends actionThunkBuilder{
  @thunk("cart/add")
  fetchAddToCart(id: string,thunkAPI?:any) {
    this.requestCreator(addToCart(this.helperOrderType(thunkAPI.getState,{productId: id})), (data) => {
      console.log(data);
    }, (err) => {

    })
  }
}

export const fetchAddToCart = createAsyncThunk(
    "cart/add",
    async (id: string, { dispatch, getState,rejectWithValue }) => {
      try {
          console.log('fetchAddToCart');
        const state = getState() as RootState
        const request = await RequestCart.addToCart({ productId: id,...helperOrderType(getState) });
        if (request.status == 200 && request.data) {
          dispatch(addCart(request.data.item));
          dispatch(
              setTotalPrice({
                totalPrice: request.data.totalPrice,
                deltaPrice: request.data.deltaPrice,
                deliveryPrice: request.data.deliveryPrice
              })
          );
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
);

