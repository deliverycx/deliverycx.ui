import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { adapterComponentUseCase } from "../../../../adapters/adapterComponents";
import { useSubscribe } from "../../../../domain/use-case/useCaseWebhook/useCase.Subscribe";
import cn from "classnames";

const SubscribeForm = () => {
    const useCaseSubscribe = adapterComponentUseCase(useSubscribe);
    const {ReducerActionTypePoints, stateSubscribe, subscribeHandler} = useCaseSubscribe.data;
    const {dispatchSubscribe} = useCaseSubscribe.handlers;
    const emailCN = cn("email-input", {error: stateSubscribe.errorMessage==="Введите корректный email"});

    const onChangeHandler = (evt: any) => {
        dispatchSubscribe({type: ReducerActionTypePoints.setErrorMessage, payload: ''});
        dispatchSubscribe({type: ReducerActionTypePoints.setEmail, payload: evt.target.value});
        dispatchSubscribe({type: ReducerActionTypePoints.setSuccessMessage, payload: ''});
    }

    return (
        <div className="footer_grid-form">
            <div className="footer_form-title">Подписывайтесь на рассылку</div>
            <form>
                <input type="email" placeholder="Введите адрес эл. почты" value={stateSubscribe.email} className={emailCN} onChange={(e) => onChangeHandler(e)}/>
                {stateSubscribe.errorMessage && <span className="error-message">{stateSubscribe.errorMessage}</span>}
                {stateSubscribe.successMessage && <span className="success-message">{stateSubscribe.successMessage}</span>}
                <button disabled={stateSubscribe.isLoading} type="button" className="form-button" onClick={() => subscribeHandler(stateSubscribe.email)}>
                    {stateSubscribe.isLoading ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: '#fff',
                                margin: 'auto',
                                position: 'absolute',
                                right: '43%',
                                top: '10px'
                            }}
                        />
                    ) : <span>Подписаться</span>
                    }
                </button>

                <div className="form-checkbox-container">
                    <input type="checkbox" id="check" className="check" checked={stateSubscribe.checked} onChange={() => dispatchSubscribe({type: ReducerActionTypePoints.setChecked, payload: !stateSubscribe.checked})}/>
                    <label htmlFor="check" className="checkbox">
                        <div className="mark"/>
                    </label>
                    <label htmlFor="check"><a href="/private.pdf" target="_blank">Соглашаюсь на обработку персональных данных <span>*</span></a></label>
                </div>
            </form>
        </div>
    )
}

export default SubscribeForm;
