import InputMask from "react-input-mask";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useAuthViewModel } from "../Auth.viewModel";
import { FC } from "react";
import { Field, FormikProvider } from "formik";
import FormFieldWrapper from "../../Forms/FormFieldWrapper";

type IProps = {

	formik: any
}

const UserSendSMS: FC<IProps> = ({ formik }) => {


	return (
		<FormikProvider value={formik}>
			<form onSubmit={formik.handleSubmit}>
				<div className="auth-center auth-content unauthorized__content">
					<div className="auth-content__info">
						<h2 className="auth-content__info-title">
							Укажите номер телефона
						</h2>
						<p className="auth-content__info-text">
							Чтобы быстро совершать заказы, получать скидки и использовать все преимущества регистрации
						</p>
					</div>

					<div className="auth-content__inputs">
						<div className="input__item input_icon input_icon_left">
							<div className="input__container">
									<h3>Временно не доступно</h3>
								</div>
								</div>
								</div>
					
					<div className="auth-footer">
						<button className="btn btn-md btn-red">Получить СМС-код</button>
						<a className="auth-footer__link">
							Продолжая, вы соглашаетесь на <span style={{color: "#8D191D"}}>обработку персональных данных</span> и <span style={{color: "#8D191D"}}>условия пользовательского соглашения</span>
						</a>
					</div>
				</div>
			</form>
		</FormikProvider>
	)
}
export default UserSendSMS

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