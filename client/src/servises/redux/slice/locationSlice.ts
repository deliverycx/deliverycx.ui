import { createSlice } from "@reduxjs/toolkit";
import LocationEntities, { ILocationEntities } from "domain/entities/locationEntities/Location.entities";
import { RTKLocation } from 'servises/repository/RTK/RTKLocation';



const locationSlice = createSlice({
  name: 'location',
  initialState:LocationEntities.getEntities,
  reducers: {
    setCiti(state:ILocationEntities,action){
      state.city = action.payload
    },
    setPoint(state:ILocationEntities,action){
      state.point = action.payload
    },
		setPointStatusDeliveryMetods(state:ILocationEntities,action){
      state.pointstatus.deliveryMetod = action.payload
    }
  },
	extraReducers: (builder) => {
    builder
      .addMatcher(RTKLocation.endpoints.getPointStatus.matchFulfilled, (state, action) => {
        state.pointstatus = action.payload
      }) 
      
  },
})
export const {setCiti,setPoint,setPointStatusDeliveryMetods} = locationSlice.actions
export default locationSlice