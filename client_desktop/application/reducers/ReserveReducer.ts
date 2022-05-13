import { ReducerAction } from ".";

export const initialStateReserve = {
  dateValue:'',
	timeValue:'',
	sucsess:null
};
type typeinitialState = typeof initialStateReserve

export enum ReducerActionTypePoints {
  setDate,
	setTime,
	setStatus
}


export function ReserveReducer(state: typeinitialState, action: ReducerAction<ReducerActionTypePoints>) {
  switch (action.type) {
    case ReducerActionTypePoints.setDate:
      return {
        ...state,
        dateValue: action.payload,
      };
  	case ReducerActionTypePoints.setTime:
      return {
        ...state,
        timeValue: action.payload,
    };
		case ReducerActionTypePoints.setStatus:
      return {
        ...state,
        timeValue: "",
				dateValue:"",
				sucsess:action.payload
    };
    
    default:
      return state
  }
}