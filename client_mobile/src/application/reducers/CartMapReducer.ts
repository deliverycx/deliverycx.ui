import { ReducerAction } from ".";

export const initialStateCartMap = {
    cord: [],
    myPosition: [],
    stateMap: [],
    valueMap: null,
    disclaimer: false,
		notificate:false,
    MapLoading: true,
    inputMap:true,
		dispalyzone:false,
		clickValueMap:null

};
type typeinitialState = typeof initialStateCartMap;

export enum ReducerActionTypePoints {
    onMapClick,
    getGeoLoc,
    hendleMapPopup,
		hendleZone,
    setStateMap,
    setExactCord,
    setDisclaimer,
    setValueMap,
    setInputMap,
		setClickValueMap,
		setNotificate,
    loading
}

export function CartMapReducer(
    state: typeinitialState,
    action: ReducerAction<ReducerActionTypePoints>
) {
    switch (action.type) {
        case ReducerActionTypePoints.getGeoLoc:
            return {
                ...state,
                myPosition: action.payload,
                stateMap: action.payload,
                MapLoading:false
            };
        
        case ReducerActionTypePoints.onMapClick:
            return {
                ...state,
                cord: action.payload.cord,
                valueMap:action.payload.value,
                disclaimer: false,
								notificate:false,
                inputMap:false
                
            };    
        case ReducerActionTypePoints.loading:
            return {
                ...state,
                loading: action.payload
            };
        case ReducerActionTypePoints.setStateMap:
            return {
                ...state,
                stateMap: action.payload
            };  
        case ReducerActionTypePoints.setExactCord:
            return {
                ...state,
                cord: action.payload,
                disclaimer: false,
								notificate:false,
            };
        case ReducerActionTypePoints.setDisclaimer:
            return {
                ...state,
                disclaimer: action.payload,
                
            };
        case ReducerActionTypePoints.setValueMap:
            return {
                ...state,
                valueMap: action.payload,
                
        };
        case ReducerActionTypePoints.setInputMap:
          return {
              ...state,
              inputMap: action.payload,
              
          };
					case ReducerActionTypePoints.setClickValueMap:
						return {
								...state,
								clickValueMap: action.payload,
								
						};	
						case ReducerActionTypePoints.setNotificate:
							return {
									...state,
									notificate: action.payload,
									
							};			
				case ReducerActionTypePoints.hendleZone:
					
						return {
								...state,
								dispalyzone: action.payload,
								
						};	
        default:
            return state;
    }
}
