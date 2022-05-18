import { ReducerActionTypePoints } from "application/reducers/ReserveReducer";
import { useReducer } from "react";
import { adapterSelector } from 'servises/redux/selectors/selectors';
import {
    initialStateSubscribe,
    SubscribeReducer,
} from "../../../application/reducers/SubscribeReducer";
import { ISubscribe } from "../../../@types/i.subscribe";
import SubscribeRequest from "../../../servises/repository/Axios/Request/Request.Subscription";

export function useSubscribe(this: any) {
    console.log('useSubscribe');

    const [stateSubscribe, dispatchSubscribe] = useReducer(
        SubscribeReducer,
        initialStateSubscribe
    );

    const initialValues:ISubscribe = {
        email: "",
        checked: false,
    };

    const validateEmail = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!stateSubscribe.email || !reg.test(stateSubscribe.email)){
            dispatchSubscribe({type: ReducerActionTypePoints.errorMessage, payload: 'Введите корректный email'});
            return false;
        } else {
            dispatchSubscribe({type: ReducerActionTypePoints.errorMessage, payload: ''});
            return true;
        }
    }

    const submitHandler = async (values:ISubscribe) => {
        console.log('submitHandler')
        // try {
        //     const result = await SubscribeRequest.subscribe({})
        //     result.status === 200 && dispatchSubscribe({
        //         type: ReducerActionTypePoints.setStatus,
        //         payload: true
        //     })
        // } catch (error) {
        //     console.log(error);
        //     dispatchSubscribe({
        //         type: ReducerActionTypePoints.setStatus,
        //         payload: false
        //     });
        // }
    }

    const subscribe = async (email: string) => {
        dispatchSubscribe({type: ReducerActionTypePoints.isLoading, payload: true});
        if (validateEmail())
            if (stateSubscribe.checked) {
                try {
                    const result = await SubscribeRequest.subscribe({to:email});

                    if (result.status === 200) {
                        dispatchSubscribe({type: ReducerActionTypePoints.successMessage, payload: 'Подписка оформлена!'});
                        dispatchSubscribe({type: ReducerActionTypePoints.email, payload: ''});
                        dispatchSubscribe({type: ReducerActionTypePoints.checked, payload: false});
                    }
                } catch (error: any) {
                    dispatchSubscribe({type: ReducerActionTypePoints.errorMessage, payload: 'Не получилось подписаться на рассылку'});
                }
            } else {
                dispatchSubscribe({type: ReducerActionTypePoints.errorMessage, payload: 'Вы должны согласится на обработку персональных данных'});
            }
        dispatchSubscribe({type: ReducerActionTypePoints.isLoading, payload: false});
    }

    this.data({
        initialValues,
        stateSubscribe,
        ReducerActionTypePoints,
        submitHandler
    })
    this.handlers({
        dispatchSubscribe
    })
    this.status({

    })
}
