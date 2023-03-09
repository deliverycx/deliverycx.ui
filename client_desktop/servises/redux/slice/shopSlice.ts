import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShopEntities, { IShopEntities } from "domain/entities/ShopEntities/Shop.entities";
import { ShopContainerMetod } from "domain/ioc/Shop.container";
import { RequestWebhook } from "servises/repository/Axios/Request";
import { fetchRefreshCart } from "./cartSlice";



const ShopContainer = new ShopContainerMetod()

export const fetStopList = createAsyncThunk(
	"shop/stoplist",
	async (orgid:any, { dispatch, getState,rejectWithValue }) => {
			try {
					
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
  reducers: ShopContainer.getReduserAction,
   
})
export const { setCategories,setStopList,setProductItem} = ShopSlice.actions
export default ShopSlice