import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit";
import { IReqCart } from "@types";
import CartEntities from "domain/entities/CartEntities/Cart.entities";
import { RequestCart } from "servises/repository/Axios/Request";
import { RootState } from "../createStore";
import { fetchOrderCart } from "../actions/actionThunk/actionThunkCart";

const cartAdapter = createEntityAdapter<IReqCart>({
  selectId: (product) => product.id
});

export const cartSelector = cartAdapter.getSelectors(
  (state: RootState) => state.cart
);

const helperOrderType = (getState: any) : {orderType:string,organization:string} => {
  const state = getState() as RootState
  return {orderType:state.cart.orderType,organization:state.location.point.guid}
}

export const fetchDiscountCart = createAsyncThunk(
  "cart/getDiscount",
  async (_, { dispatch,getState, rejectWithValue }) => {
      try {
          const request = await RequestCart.DzoneDicountCart(helperOrderType(getState));
          if (request.data && request.status === 200) {
							dispatch(
								setTotalPrice({
										totalPrice: request.data.totalPrice - request.data.discountDozen,
										deltaPrice: request.data.deltaPrice,
										deliveryPrice: request.data.deliveryPrice
								})
							);
              return request.data

          }
      } catch (error: any) {
					return rejectWithValue(error.response.data);
      }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState(CartEntities.getEntities),
  reducers: {
      addAllCart: cartAdapter.upsertMany,
      addCart: cartAdapter.setOne,
      changeCart: cartAdapter.updateOne,
      refreshCart: cartAdapter.setAll,
      removeCart: cartAdapter.removeOne,
      deleteCart: cartAdapter.removeAll,
      setAdress: (state, action) => {
          state.address = action.payload;
      },
      setTotalPrice: (state, action) => {
          state.totalPrice = action.payload.totalPrice;
          state.deltaPrice = action.payload.deltaPrice;
          state.deliveryPrice = action.payload.deliveryPrice;
      },
      setErrors: (state, action) => {
          state.orderError = action.payload.errors;
      },
      setOrderType:(state, action) => {
          state.orderType = action.payload;
      },
      accessOrder: (state) => {
          state.orderNumber = null;
          state.orderError = {};
          state.address = "";
      }
  },
  extraReducers: (builder) => {
      builder.addCase(fetchOrderCart.pending, (state) => {
          state.loadingOrder = true;
      }),
      builder.addCase(fetchOrderCart.fulfilled, (state, action) => {
          state.loadingOrder = false;
      }),
      builder.addCase(fetchOrderCart.rejected, (state, action) => {
          state.orderError = {
              error: action.payload,
              status: 500
          };
          state.loadingOrder = false;
      });
			builder.addCase(fetchDiscountCart.pending, (state) => {
				state.loadingDiscount = true;
				state.loadingOrder = true;
			})
			builder.addCase(fetchDiscountCart.fulfilled, (state) => {
				state.loadingDiscount = false;
				state.loadingOrder = false;
			})
			builder.addCase(fetchDiscountCart.rejected, (state) => {
				state.loadingDiscount = false;
				state.loadingOrder = false;
			})
  }
});
export const {
  addAllCart,
  addCart,
  changeCart,
  refreshCart,
  removeCart,
  deleteCart,
  setAdress,
  setTotalPrice,
  setErrors,
  accessOrder,
  setOrderType
} = cartSlice.actions;
export default cartSlice;
