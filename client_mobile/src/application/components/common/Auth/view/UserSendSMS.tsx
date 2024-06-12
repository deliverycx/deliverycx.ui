import InputMask from 'react-input-mask';
import { FC } from 'react';
import { Field, FormikProvider } from 'formik';
import FormFieldWrapper from '../../Forms/FormFieldWrapper';

type IProps = {
	formik: any;
	codes: any;
};

const UserSendSMS: FC<IProps> = ({ formik, codes }) => {
	return (
		<FormikProvider value={formik}>
			<form onSubmit={formik.handleSubmit}>
				<div className="auth-center auth-content unauthorized__content">
					<div className="auth-content__info">
						<h2 className="auth-content__info-title">Укажите номер телефона</h2>
						<p className="auth-content__info-text">
							Чтобы быстро совершать заказы, получать скидки и использовать все
							преимущества регистрации
						</p>
					</div>

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
									isValid={!formik.values.phone.length || formik.errors.phone}
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
										!formik.values.password.length || formik.errors.password
									}
									error={!!(formik.errors.password && formik.touched.password)}
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
						{typeof codes === 'boolean' && codes === false && (
							<span className="error">
								Произошла ошибка, такой пользователь существует,
								<br /> попробуйте ещё раз или сообщите нам об ошибке
							</span>
						)}
					</div>

					<div className="auth-footer">
						<button className="btn btn-md btn-red">Получить СМС-код</button>
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
	);
};
export default UserSendSMS;

/*
<div className="auth-content__inputs">
						<div className="input__item input_icon input_icon_left">
							<div className="input__container">
								<img src={require("assets/images/icons/phone_gray.png")} alt="" />
								<FormFieldWrapper
									placeholderIco={""}
									placeholderValue="Телефон"
									isValid={
										!formik.values.phone.length || formik.errors.phone
									}
									error={!!(formik.errors.phone && formik.touched.phone)}
									errorValue={formik.errors.phone}
								>
									<div className="input__container">
										<img src={require("assets/images/icons/phone_gray.png")} alt="" />
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

					</div> */
