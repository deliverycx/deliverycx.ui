import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShopEntities, { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { useCaseShopEntiti } from "domain/use-case/useCaseShop";
import { RequestCart } from "servises/repository/Axios/Request";
import RequestWebhook from "servises/repository/Axios/Request/Request.Webhook";
import {RTKCategories } from "servises/repository/RTK/RTKCategories";
import { addAllCart, fetchRefreshCart, setTotalPrice } from "./cartSlice";



const ShopuseCase = new useCaseShopEntiti()

export const fetStopList = createAsyncThunk(
	"shop/stoplist",
	async (orgid:any, { dispatch, getState,rejectWithValue }) => {
			try {
					console.log('mob stoplist',orgid);
					const request = await RequestWebhook.stoplist(orgid);	
					if (request.status == 200 && request.data) {
							dispatch(setStopList(request.data));
							dispatch(fetchRefreshCart())
					}
			} catch (error: any) {
					return rejectWithValue(error.response.data);
			}
	}
);

const ShopSlice = createSlice({
  name: 'shop',
  initialState:ShopEntities.getEntities as IShopEntities,
  reducers: ShopuseCase.getReduserAction,
  extraReducers: (builder) => {
    builder
      .addMatcher(RTKCategories.endpoints.getCategori.matchFulfilled, (state, action) => {
        state.category = action.payload[0]
      }) 
      
  },
})
export const { setCategories,setStopList} = ShopSlice.actions
export default ShopSlice