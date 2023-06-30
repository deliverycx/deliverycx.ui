import { createSlice } from "@reduxjs/toolkit";
import { entitiTest } from "application/entititest";

const testReduser = createSlice({
	name: 'test',
	initialState:{...entitiTest},
	reducers:{
		setTest(state:any,action){
			state = action
      
    },
	}
})

export const {setTest} = testReduser.actions
export default testReduser