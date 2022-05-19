import { SubscribeReducer,initialStateSubscribe,ReducerActionTypePoints } from "application/reducers/SubscribeReducer";
import { useReducer } from "react";

import { ISubscribe } from "../../../@types/i.subscribe";
import SubscribeRequest from "../../../servises/repository/Axios/Request/Request.Subscription";

export function useSubscribe(this: any) {

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
            dispatchSubscribe({type: ReducerActionTypePoints.setErrorMessage, payload: 'Введите корректный email'});
            return false;
        } else {
            dispatchSubscribe({type: ReducerActionTypePoints.setErrorMessage, payload: ''});
            return true;
        }
    }

    const subscribeHandler = async (email: string) => {

        if (validateEmail()) {
            if (stateSubscribe.checked) {
                try {
                    dispatchSubscribe({type: ReducerActionTypePoints.setisLoading, payload: true});
                    const result = await SubscribeRequest.subscribe({to:email});

                    if (result.status === 200) {
                        dispatchSubscribe({type: ReducerActionTypePoints.setStatus, payload: 'Подписка оформлена!'})
                    }
                } catch (error: any) {
                    dispatchSubscribe({type: ReducerActionTypePoints.setErrorMessage, payload: 'Не получилось подписаться на рассылку'});
                    dispatchSubscribe({type: ReducerActionTypePoints.setisLoading, payload: false});
                }
            } else {
                dispatchSubscribe({type: ReducerActionTypePoints.setErrorMessage, payload: 'Вы должны согласится на обработку персональных данных'});
            }
        }
    }

    this.data({
        initialValues,
        stateSubscribe,
        ReducerActionTypePoints,
        subscribeHandler
    })
    this.handlers({
        dispatchSubscribe
    })
    this.status({

    })
}
