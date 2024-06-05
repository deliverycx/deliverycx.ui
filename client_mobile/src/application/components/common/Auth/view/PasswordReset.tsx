import { valid } from 'application/helpers/validationSchema';
import { Field, FormikProvider, useFormik } from 'formik';
import PinInput from 'react-pin-input';
import * as yup from 'yup';
import TabBar from '../../TabBar/TabBar';
import InputMask from 'react-input-mask';
import FormFieldWrapper from '../../Forms/FormFieldWrapper';
import { requestUser } from 'modules/UserModule/data/user.request';
import { useState } from 'react';
import { userUseCase } from 'modules/UserModule/user.module';
import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';

const PasswordReset = () => {
	const [send, setSendSMS] = useState<any>();
	const [error, setError] = useState(false);
	const [errorcode, setErrorCode] = useState(false);
	const navigate = useNavigate();

	const initialValues = {
		phone: '',
		password: '',
		confirmpassword: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: yup.object().shape({
			phone: valid.phone,
			password: yup
				.string()
				.required('Пароль обезателен')
				.min(5, 'Ваш пароль слишком короткий.'),
			//.matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
			confirmpassword: yup
				.string()
				.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
		}),
		onSubmit: async (values) => {
			await handlerSMS(values);
		},
	});

	const handlerSMS = async (value: typeof initialValues) => {
		try {
			if (value.phone) {
				const { data } = await requestUser.smsResetSend({ phone: value.phone });

				if (data && typeof data === 'number') {
					setSendSMS(String(data));
				} else {
					setError(true);
				}
			}
		} catch (error) {
			setError(true);
		}
	};

	const handlerCodeSend = async (code: string) => {
		if (code == send) {
			await requestUser.smsResetPass({
				phone: formik.values.phone,
				password: formik.values.password,
			});
			const result = await userUseCase.loginUser({
				phone: formik.values.phone,
				password: formik.values.password,
			});

			if (result) {
				navigate(ROUTE_APP.PROFILE.PROFILE_MAIN);
			}
		} else {
			console.log('qqq');
			setErrorCode(true);
		}
	};

	console.log('ww', error);

	return (
		<>
			<div className="auth unauthorized">
				<div className="top-bar">
					<div className="top-bar__left">
						<div className="top-bar__icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
									fill="#8D191D"
								/>
							</svg>
						</div>
						<h3>Восстановление пароля</h3>
					</div>
				</div>
				<FormikProvider value={formik}>
					<form onSubmit={formik.handleSubmit}>
						<div className="auth-center auth-content unauthorized__content">
							<div className="auth-content__info">
								<h2 className="auth-content__info-title">
									Укажите номер телефона
								</h2>
								<p className="auth-content__info-text">
									Вам в смс придет код подтверждения
								</p>
							</div>

							{send ? (
								<div className="auth-content__inputs">
									<h2 className="auth-content__info-title">Введите код</h2>
									<div className="auth-content__inputs-sms">
										<PinInput
											autoSelect={true}
											length={4}
											onComplete={(value) => handlerCodeSend(value)}
										/>
									</div>
									{errorcode && <span>Не верный код</span>}
								</div>
							) : (
								<div className="auth-content__inputs">
									<div className="input__item input_icon input_icon_left">
										<div className="input__container">
											<img
												src={require('assets/images/icons/phone_gray.png')}
												alt=""
											/>
											<FormFieldWrapper
												placeholderIco={''}
												placeholderValue="Телефон"
												isValid={
													!formik.values.phone.length || formik.errors.phone
												}
												error={!!(formik.errors.phone && formik.touched.phone)}
												errorValue={formik.errors.phone}
											>
												<div className="input__container">
													<img
														src={require('assets/images/icons/phone_gray.png')}
														alt=""
													/>
													<Field
														name="phone"
														render={({ field }: any) => (
															<InputMask
																{...field}
																mask="+7 999 999 99 99"
																maskPlaceholder={null}
																className="form__field-wrapper__input"
																placeholder="+7"
																value={formik.values.phone}
																onChange={formik.handleChange}
															/>
														)}
													/>
												</div>
											</FormFieldWrapper>
										</div>
									</div>
									<div className="input__item input_icon">
										<div className="input__container">
											<FormFieldWrapper
												placeholderIco={''}
												placeholderValue="Телефон"
												isValid={
													!formik.values.password.length ||
													formik.errors.password
												}
												error={
													!!(formik.errors.password && formik.touched.password)
												}
												errorValue={formik.errors.password}
											>
												<div className="input__container">
													<Field
														type="password"
														name="password"
														placeholder="Пароль"
													/>
												</div>
											</FormFieldWrapper>
										</div>
										<div className="input__container">
											<FormFieldWrapper
												placeholderIco={''}
												placeholderValue="Телефон"
												isValid={
													!formik.values.confirmpassword.length ||
													formik.errors.confirmpassword
												}
												error={
													!!(
														formik.errors.confirmpassword &&
														formik.touched.confirmpassword
													)
												}
												errorValue={formik.errors.confirmpassword}
											>
												<div className="input__container">
													<Field
														type="password"
														name="confirmpassword"
														placeholder="Повторите пароль"
													/>
												</div>
											</FormFieldWrapper>
										</div>
									</div>
									{error && (
										<span className="error">
											Произошла ошибка, аккаунт не найден
										</span>
									)}
									<div className="auth-footer">
										<button className="btn btn-md btn-red">
											Изменить пароль
										</button>
										<a className="auth-footer__link">
											Продолжая, вы соглашаетесь на{' '}
											<span style={{ color: '#8D191D' }}>
												обработку персональных данных
											</span>{' '}
											и{' '}
											<span style={{ color: '#8D191D' }}>
												условия пользовательского соглашения
											</span>
										</a>
									</div>
								</div>
							)}
						</div>
					</form>
				</FormikProvider>
				<TabBar />
			</div>
		</>
	);
};
export default PasswordReset;
