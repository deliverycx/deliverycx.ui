import { createSlice } from "@reduxjs/toolkit";
import LocationEntities, { ILocationEntities } from "domain/entities/locationEntities/Location.entities";
import { LocationContainerMetod } from "domain/ioc/Location.container";
import { RTKLocation } from "servises/repository/RTK/RTKLocation";

const LocationAction = new LocationContainerMetod()

const locationSlice = createSlice({
  name: 'location',
  initialState:LocationEntities.getEntities,
  reducers: LocationAction.getReduserAction,
	extraReducers: (builder) => {
    builder
      .addMatcher(RTKLocation.endpoints.getPointStatus.matchFulfilled, (state, action) => {
        state.pointstatus = action.payload
      }) 
      
  },
})
export const {setCiti,setPoint, setModal,setMapModal} = locationSlice.actions
export default locationSlice