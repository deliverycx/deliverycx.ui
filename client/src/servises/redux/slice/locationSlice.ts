import { createSlice } from "@reduxjs/toolkit";
import { ICity, IPoint } from "@types";
import LocationEntities, { ILocationEntities } from "domain/entities/locationEntities/Location.entities";



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
  }
})
export const {setCiti,setPoint} = locationSlice.actions
export default locationSlice