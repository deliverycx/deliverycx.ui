import { ReducerAction } from ".";

export const initialStateSubscribe = {
    email:'',
    errorMessage:'',
    successMessage:'',
    checked:false,
    isLoading: false,
    status: null
};
type typeInitialState = typeof initialStateSubscribe

export enum ReducerActionTypePoints {
    setEmail,
    setChecked,
    setisLoading,
    setErrorMessage,
    setSuccessMessage,
    setStatus
}

export function SubscribeReducer(state: typeInitialState, action: ReducerAction<ReducerActionTypePoints>) {
    switch (action.type) {
        case ReducerActionTypePoints.setEmail:
            return {
                ...state,
                email: action.payload,
            };
						
        case ReducerActionTypePoints.setChecked:
            return {
                ...state,
                checked: action.payload,
            };
						
        case ReducerActionTypePoints.setisLoading:
            return {
                ...state,
                isLoading: action.payload,
            };
						
        case ReducerActionTypePoints.setErrorMessage:
            return {
                ...state,
                errorMessage: action.payload,
            };

        case ReducerActionTypePoints.setStatus:
            return {
                ...state,
								successMessage: action.payload,
                email: '',
                checked:false,
                
            };
        default:
            return state
    }
}
