import { createSlice } from "@reduxjs/toolkit";
import { ICity, IPoint } from "@types";
import LocationEntities, { ILocationEntities } from "domain/entities/locationEntities/Location.entities";
import { RTKLocation } from 'servises/repository/RTK/RTKLocation';



const locationSlice = createSlice({
  name: 'location',
  initialState:LocationEntities.getEntities,
  reducers: {
    setCiti(state:ILocationEntities,action: { payload: ICity; }){
      state.city = action.payload
    },
    setPoint(state:ILocationEntities,action: { payload: IPoint; }){
      state.point = action.payload
    }
  },
	extraReducers: (builder) => {
    builder
      .addMatcher(RTKLocation.endpoints.getPointStatus.matchFulfilled, (state, action) => {
        state.pointstatus = action.payload
      }) 
      
  },
})
export const {setCiti,setPoint} = locationSlice.actions
export default locationSlice