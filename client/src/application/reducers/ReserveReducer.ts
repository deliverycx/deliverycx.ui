/* eslint-disable no-mixed-spaces-and-tabs */
import { ReducerAction } from ".";

export const initialStateReserve = {
    dateValue: new Date(),
    timeValue: new Date(),
    success: null
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
          console.log('action.payload', action.payload);
          return {
              ...state,
              timeValue: new Date(),
              dateValue: new Date(),
              success: action.payload
          };

    default:
      return state
  }
}
