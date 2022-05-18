import { ReducerAction } from ".";

export const initialStateSubscribe = {
    email:'',
    errorMessage:'',
    successMessage:'',
    checked:false,
    isLoading: false,
    status: null
};
export type typeInitialState = typeof initialStateSubscribe

export enum ReducerActionTypePoints {
    email,
    checked,
    isLoading,
    errorMessage,
    successMessage,
    status
}

export function SubscribeReducer(state: typeInitialState, action: ReducerAction<ReducerActionTypePoints>) {
    switch (action.type) {
        case ReducerActionTypePoints.email:
            return {
                ...state,
                email: action.payload,
            };
        case ReducerActionTypePoints.checked:
            return {
                ...state,
                checked: action.payload,
            };
        case ReducerActionTypePoints.isLoading:
            return {
                ...state,
                isLoading: action.payload,
            };
        case ReducerActionTypePoints.errorMessage:
            return {
                ...state,
                errorMessage: action.payload,
            };
        // case ReducerActionTypePoints.successMessage:
        //     return {
        //         ...state,
        //         email: "",
        //         checked:"",
        //         successMessage:action.payload
        //     };

        case ReducerActionTypePoints.status:
            return {
                ...state,
                email: "",
                checked:"",
                success: action.payload
            };

        default:
            return state
    }
}
