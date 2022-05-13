import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SubscribeRequest from "../../../../servises/repository/Axios/Request/Request.Subscription";

const SubscribeForm = () => {
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChangeHandler = (evt: any) => {
        setErrorMessage('');
        setEmail(evt.target.value);
    }

    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setSuccessMessage('');
        }, 3000)

        return () => clearTimeout(timerId);
    }, [])


    const validateEmail = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email || !reg.test(email)){
            setErrorMessage('Введите корректный email');
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
    }

    const subscribe = async (email: string) => {
        setIsLoading(true);
        if (validateEmail())
            if (checked) {
                try {
                    const result = await SubscribeRequest.subscribe({to:email});

                    if (result.status === 200) {
                        setSuccessMessage('Подписка оформлена!');
                        setEmail('');
                        setChecked(false);
                    }
                } catch (error: any) {
                    setErrorMessage('Не получилось подписаться на рассылку')
                }
            } else {
                setErrorMessage('Вы должны согласится на обработку персональных данных')
            }
        setIsLoading(false);
    }

    return (
        <div className="footer_grid-form">
            <div className="footer_form-title">Подписывайтесь на рассылку</div>
            <form>
                <input type="email" placeholder="Введите адрес эл. почты" value={email} className="email-input" onChange={(e) => onChangeHandler(e)}/>
                {errorMessage && <span className="error-message">{errorMessage}</span>}
                {successMessage && <span className="success-message">{successMessage}</span>}
                <button disabled={isLoading} type="button" className="form-button" onClick={() => subscribe(email)}>
                    {isLoading ? (
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
                    <input type="checkbox" id="check" className="check" checked={checked} onChange={() => setChecked(!checked)}/>
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
