import { useNavigate } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { useState } from 'react';
import TabBar from '../../TabBar/TabBar';
import { Desktop, Mobile } from 'application/ResponseMedia';
import { FormikProvider, Field } from 'formik';
import FormFieldWrapper from '../../Forms/FormFieldWrapper';
import InputMask from 'react-input-mask';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { valid } from 'application/helpers/validationSchema';
import { userUseCase } from 'modules/UserModule/user.module';

/* eslint-disable no-irregular-whitespace */

const OfferAuth = () => {
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState(false);
	const initialValues = {
		phone: '',
		password: '',
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
		}),
		onSubmit: async (values) => {
			try {
				const result = await userUseCase.loginUser(values);
				if (result) {
					navigate(ROUTE_APP.PROFILE.PROFILE_MAIN);
				} else {
					setLoginError(true);
				}
			} catch (error) {
				console.log(error);
				setLoginError(true);
			}
		},
	});

	return (
		<>
			<Mobile>
				<div className="basket auth-block">
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
							<h3>Авторизация</h3>
						</div>
					</div>
					<div className="unauthorized__content">
						<div className="unauthorized__content-sticker">
							<img
								src={require('assets/images/delivery/unauthorized.png')}
								alt="Весёлый хинкалик"
							/>
						</div>
						<div className="unauthorized__content-title">
							Вы не авторизованы
						</div>
						<div className="unauthorized__content-text">
							Для доступа к сохранённым адресам доставки и истории заказов,
							необходимо войти в свой профиль
						</div>
						<FormikProvider value={formik}>
							<form onSubmit={formik.handleSubmit}>
								<div className="auth-center auth-content unauthorized__content">
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
													error={
														!!(formik.errors.phone && formik.touched.phone)
													}
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
														!!(
															formik.errors.password && formik.touched.password
														)
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
										</div>
									</div>
									{loginError && (
										<div className="login-error">
											Не верный телефон или пароль,{' '}
											<a className="error" href="/reset">
												Восстановление пароля
											</a>
										</div>
									)}

									<div className="auth-footer">
										<button className="btn btn-md btn-red">Войти</button>
										<div className="unauthorized__content-text">
											Если у вас нет аккаунта,{' '}
											<a
												href={ROUTE_APP.AUTH.REGISTER}
												className="auth-footer__link"
											>
												<span style={{ color: '#8D191D' }}>
													Зарегистрируйтесь
												</span>
											</a>
										</div>
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
							</form>
						</FormikProvider>
					</div>

					<TabBar />
				</div>
			</Mobile>
			<Desktop>
				<div className="page-contaiter">
					<div className="top-bar">
						<div className="top-bar__left">
							<div className="top-bar__icon" onClick={() => navigate(-1)}>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18.3 5.70875C17.91 5.31875 17.28 5.31875 16.89 5.70875L12 10.5888L7.10997 5.69875C6.71997 5.30875 6.08997 5.30875 5.69997 5.69875C5.30997 6.08875 5.30997 6.71875 5.69997 7.10875L10.59 11.9988L5.69997 16.8887C5.30997 17.2787 5.30997 17.9087 5.69997 18.2987C6.08997 18.6887 6.71997 18.6887 7.10997 18.2987L12 13.4087L16.89 18.2987C17.28 18.6887 17.91 18.6887 18.3 18.2987C18.69 17.9087 18.69 17.2787 18.3 16.8887L13.41 11.9988L18.3 7.10875C18.68 6.72875 18.68 6.08875 18.3 5.70875Z"
										fill="#8D191D"
									/>
								</svg>
							</div>
							<h3>Авторизация</h3>
						</div>
					</div>
					<div className="unauthorized__content">
						<div className="unauthorized__content-title">
							Вы не авторизованы
						</div>
						<div className="unauthorized__content-text">
							Для доступа к сохранённым адресам доставки и истории заказов,
							необходимо войти в свой профиль
						</div>
						<FormikProvider value={formik}>
							<form onSubmit={formik.handleSubmit}>
								<div className="auth-center auth-content unauthorized__content">
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
													error={
														!!(formik.errors.phone && formik.touched.phone)
													}
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
														!!(
															formik.errors.password && formik.touched.password
														)
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
										</div>
									</div>
									{loginError && (
										<div className="login-error">
											Не верный телефон или пароль,
											<a className="error" href="">
												Восстановление пароля
											</a>
										</div>
									)}

									<div className="auth-footer">
										<button className="auth-button btn btn-md btn-red">
											Войти
										</button>
										<div className="unauthorized__content-text">
											Если у вас нет аккаунта,{' '}
											<a
												href={ROUTE_APP.AUTH.REGISTER}
												className="auth-footer__link"
											>
												<span style={{ color: '#8D191D' }}>
													Зарегистрируйтесь
												</span>
											</a>
										</div>
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
							</form>
						</FormikProvider>
					</div>
				</div>
			</Desktop>
		</>
	);
};
export default OfferAuth;
