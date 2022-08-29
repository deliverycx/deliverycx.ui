import { addToCart } from "servises/repository/Axios/Interactor";
import { actionThunkBuilder, thunk } from "../actionThunkBuilder";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../createStore";
import { RequestCart } from "../../../repository/Axios/Request";
import {
    addAllCart,
    addCart,
    changeCart,
    deleteCart,
    refreshCart,
    removeCart,
    setTotalPrice
} from "../../slice/cartSlice";

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

export const fetchAllCart = createAsyncThunk(
    "cart/getAll",
    async (_, { dispatch, getState,rejectWithValue }) => {
        try {
            const request = await RequestCart.allCart(helperOrderType(getState));

            if (request.status == 200 && request.data) {
                dispatch(addAllCart(request.data.cart));
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

export const fetchRefreshCart = createAsyncThunk(
    "cart/refresh",
    async (_, { dispatch, getState,rejectWithValue }) => {
        try {

            const request = await RequestCart.allCart(helperOrderType(getState));


            if (request.status == 200 && request.data) {
                dispatch(refreshCart(request.data.cart));
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

export const fetchChangeAmount = createAsyncThunk(
    "cart/amount",
    async (change: any, { dispatch, getState,rejectWithValue }) => {
        try {
            const state = getState() as RootState
            const request = await RequestCart.changeAmount({...change,...helperOrderType(getState)});
            if (request.status == 200) {
                dispatch(
                    changeCart({
                        id: change.cartId,
                        changes: request.data.item
                    })
                );
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

export const fetchRemoveCart = createAsyncThunk(
    "cart/removeOne",
    async (cartId: string, { dispatch,getState, rejectWithValue }) => {
        try {
            const request = await RequestCart.removeCart({ cartId,...helperOrderType(getState) });
            if (request.status == 200 && cartId === request.data.deletedId) {
                dispatch(removeCart(cartId));
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

export const fetchDeleteCart = createAsyncThunk(
    "cart/deleteAll",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const request = await RequestCart.deleteCart();
            if (request.status == 200) {
                dispatch(deleteCart());
                dispatch(
                    setTotalPrice({
                        totalPrice: 0,
                        deltaPrice: 0
                    })
                );
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
