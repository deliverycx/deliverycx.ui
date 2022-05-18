import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { adapterComponentUseCase } from "../../../../adapters/adapterComponents";
import { useSubscribe } from "../../../../domain/use-case/useCaseWebhook/useCase.Subscribe";

const SubscribeForm = () => {
    const useCaseSubscribe = adapterComponentUseCase(useSubscribe);
    const {ReducerActionTypePoints,stateSubscribe} = useCaseSubscribe.data;
    const {dispatchSubscribe} = useCaseSubscribe.handlers;

    const onChangeHandler = (evt: any) => {
        dispatchSubscribe({type: ReducerActionTypePoints.errorMessage, payload: ''});
        dispatchSubscribe({type: ReducerActionTypePoints.email, payload: evt.target.value});
    }

    useEffect(()=>{
        const timerId = setTimeout(()=>{
            dispatchSubscribe({type: ReducerActionTypePoints.successMessage, payload: ''});
        }, 3000)

        return () => clearTimeout(timerId);
    }, [])

    return (
        <div className="footer_grid-form">
            <div className="footer_form-title">Подписывайтесь на рассылку</div>
            <form>
                <input type="email" placeholder="Введите адрес эл. почты" value={stateSubscribe.email} className="email-input" onChange={(e) => onChangeHandler(e)}/>
                {stateSubscribe.errorMessage && <span className="error-message">{stateSubscribe.errorMessage}</span>}
                {stateSubscribe.successMessage && <span className="success-message">{stateSubscribe.successMessage}</span>}
                <button disabled={stateSubscribe.isLoading} type="button" className="form-button" onClick={() => dispatchSubscribe(stateSubscribe.email)}>
                    {stateSubscribe.isLoading ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: '#fff',
                                margin: 'auto',
                                position: 'absolute',
                                right: '43%',
                            }}
                        />
                    ) : <span>Подписаться</span>
                    }
                </button>

                <div className="form-checkbox-container">
                    <input type="checkbox" id="check" className="check" checked={stateSubscribe.checked} onChange={() => dispatchSubscribe({type: ReducerActionTypePoints.checked, payload: !stateSubscribe.checked})}/>
                    <label htmlFor="check" className="checkbox">
                        <div className="mark"></div>
                    </label>
                    <label htmlFor="check">Соглашаюсь на обработку персональных данных <span>*</span></label>
                </div>
                <div className='footer_form-agreement'>
                    <div><span>*</span>Настоящим я свободно, своей волей и в своём интересе даю согласие на то что...</div>
                    <a href="#">Показать соглашение</a>
                </div>
            </form>
        </div>
    )
}

export default SubscribeForm;
