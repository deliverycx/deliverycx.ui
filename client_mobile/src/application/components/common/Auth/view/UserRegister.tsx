import { userUseCase } from "modules/UserModule/user.module";
import React, { useEffect, useState } from "react";
import { FC } from "react"
import PinInput from 'react-pin-input';
import cn from 'classnames'
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';

type IProps = {
	formik: any
	set:any
}
const UserRegister: FC<IProps> = ({ formik,set }) => {
	const navigate = useNavigate()
	const [errorCode,setErrorCode] = useState(false)

	const [over, setOver] = useState(false);
	const [[h, m, s], setTime] = useState([0, 1, 0]);

	const tick = () => {
		if (over) return;

		if (h === 0 && m === 0 && s === 0) {
			setOver(true);
		} else if (m === 0 && s === 0) {
			setTime([h - 1, 59, 59]);
		} else if (s == 0) {
			setTime([h, m - 1, 59]);
		} else {
			setTime([h, m, s - 1]);
		}
	};

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	const reset = () => {
		setTime([0, 1, 0]);
		setOver(false);
		formik.submitForm()
	};

	const handlerCodeSend = async (code:string,phone:string) =>{
		try {
			const successCode = await userUseCase.authUser(phone,code)

			if(successCode){
				navigate(ROUTE_APP.PROFILE.PROFILE_MAIN)
			}else{
				setErrorCode(true)
			}
			
		} catch (error) {
			console.log(error);
		}
	}


	const CN = cn("auth-content__inputs-sms",{"validate--error":errorCode})

	return (
		<>
			<div className="auth-content unauthorized__content">
				<div className="auth-content__info">
					<h2 className="auth-content__info-title">
						Введите код из СМС
					</h2>
					<p className="auth-content__info-text">
						Код отправлен на номер
					</p>
					<h3 className="auth-content__info-numb">
						{formik.values.phone}
					</h3>
				</div>
				<div className="auth-content__inputs">
					<div className={CN}>
						
						<PinInput length={4} onChange={(value, index) => {setErrorCode(false)}}  onComplete={(value, index) => handlerCodeSend(value,formik.values.phone)} />
					</div>
					{
						errorCode &&
						<span className="validate validate-error">
							<img src={require('assets/images/icons/warning.png')} alt="" />
							Неверный код, попробуйте ещё раз
						</span>
					}
					
				</div>
			</div>
			<div className="auth-footer">
				<button disabled={!over} className="btn btn-md btn-red" onClick={reset}>
					{
						!over
							? <>
								Запросить новый код через <p>{`${m
									.toString()
									.padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
							</>
							: "Запросить новый код "
					}

				</button>
				<button className="btn-none btn btn-md" onClick={()=> set(false)}>
					Изменить номер телефона
				</button>
			</div>
		</>
	)
}
export default UserRegister