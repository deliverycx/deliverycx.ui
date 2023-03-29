import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from "@reduxjs/toolkit";
import { IReqCart } from "@types";
import { AxiosError } from "axios";
import CartEntities from "domain/entities/CartEntities/Cart.entities";
import { RequestCart } from "servises/repository/Axios/Request";
import { RTKCart } from "servises/repository/RTK/RTKCart";
import { AppDispatch, RootState } from "../createStore";
import { actionPaymentAccsess, actionPaymentReady } from "./bankCardSlice";
import { DefaultinitialValues } from "application/components/core/Cart/CartForm/CartForm";

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
export const fetchAddToCart = createAsyncThunk(
    "cart/add",
    async (id: string, { dispatch, getState,rejectWithValue }) => {
        try {
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
								//dispatch(setOrderType("COURIER"))
                dispatch(
                    setTotalPrice({
                        totalPrice: 0,
                        deltaPrice: 0,
												deliveryPrice:0
                    })
                );
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchDectroyCart = createAsyncThunk(
	"cart/deleteAll",
	async (_, { dispatch, rejectWithValue }) => {
			try {
					const request = await RequestCart.deleteCart();
					if (request.status == 200) {
							dispatch(deleteCart());
							dispatch(setOrderInfo(DefaultinitialValues))
							dispatch(
									setTotalPrice({
											totalPrice: 0,
											deltaPrice: 0,
											deliveryPrice:0
									})
							);
							setOrderInfo
					}
			} catch (error: any) {
					return rejectWithValue(error.response.data);
			}
	}
);


export const fetchOrderCart = createAsyncThunk(
    "cart/order",
    async (value: any, { dispatch, rejectWithValue }) => {
      try {
        
            const request = await RequestCart.OrderCheckCart(value);
            if (request.data && request.status === 200) {
                const order = await RequestCart.OrderCart(value);
                
                dispatch(actionPaymentAccsess());
                return order.data 
								
            }
        } catch (error: any) {
            // Ошибка валидации по количеству
            dispatch(actionPaymentReady(false));
            if (error.response.status === 422) {
                dispatch(setErrors(error.response.data));
            } else {
                return rejectWithValue(error.response.data);
            }
            
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
				setOrderTable:(state, action) =>{
					state.orderTable = action.payload
				},
        
				setOrderInfo: (state, action) => {
					state.orderInfo = {...state.orderInfo,...action.payload};
				},

        setTotalPrice: (state, action) => {
            state.orderPrice = action.payload;
        },
        setErrors: (state, action) => {
            state.orderError = action.payload.errors;
        },
				setENErrors: (state, action) => {
					state.orderError = action.payload;
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
    }
});
export const {
    addAllCart,
    addCart,
    changeCart,
    refreshCart,
    removeCart,
    deleteCart,
   
    setTotalPrice,
    setErrors,
    accessOrder,
    setOrderType,
		setENErrors,
		setOrderTable,
		setOrderInfo
} = cartSlice.actions;
export default cartSlice;
