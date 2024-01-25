import TabBar from "application/components/common/TabBar/TabBar"
import { Field, FormikProvider, useFormik } from "formik"
import { NavLink, useNavigate } from "react-router-dom"
import { PROFILE_ROUTE } from "utils/consts"
import schema, { shemaProfilePersonal } from "application/helpers/validationSchema";
import FormFieldWrapper from "application/components/common/Forms/FormFieldWrapper";
import InputMask from "react-input-mask";
import { requestProfile } from "modules/Profile/data/profile.request";
import { useState } from "react";
import { profileModel } from "modules/Profile/profile.module";
import { observer } from 'mobx-react-lite';
import { userModel } from "modules/UserModule/user.module";
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useProfilePersonalViewModel } from "./Personal.viewModel";
import LayoutDesctop from "application/components/common/Layout/LayoutDesctop";

const HOCPersonalDesc = () => {
	const useCase = adapterComponentUseCase(useProfilePersonalViewModel)
	const {profile,formik,error} = useCase.data

	return (
		<LayoutDesctop>
		<div className="page-contaiter">
		<FormikProvider value={formik}>
			<form onSubmit={formik.handleSubmit}>
				<div className="personal">
					<div className="top-bar">
					<div className="top-bar__left">
						<div className="top-bar__icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#8D191D" /></svg>
						</div>
						<h3>Личные данные</h3>
					</div>
					</div>
					<div className="personal-content">
						<div className="input__item">
							<FormFieldWrapper
								placeholderIco={""}
								placeholderValue="Имя"
								isValid={formik.errors.name}
								error={!!(formik.errors.name && formik.touched.name)}
								errorValue={formik.errors.name}

							>
								<label htmlFor="user">Имя</label>
								<div className="input__container">

									<Field

										name="name"
										placeholder="Ваше имя"
										value={formik.values.name}
										onChange={formik.handleChange}
									/>
								</div>

							</FormFieldWrapper>
						</div>
						<div className="input__item">
							
							<FormFieldWrapper
								placeholderIco={""}
								placeholderValue="Фамилия"
								isValid={formik.errors.name}
								error={!!(formik.errors.name && formik.touched.lastname)}
								errorValue={formik.errors.name}

							>
								<label htmlFor="user">Фамилия</label>
								<div className="input__container">

									<Field

										name="lastname"
										placeholder="Ваша Фамилия"
										value={formik.values.lastname}
										onChange={formik.handleChange}
									/>
								</div>

							</FormFieldWrapper>
						</div>
						<div className="personal-content__items">
							<div className="input__item">
								<label htmlFor="birthday">День рождения</label>
								<div className="input__container">


									<FormFieldWrapper
										isValid={formik.errors.birthday as any}
										error={!!(formik.errors.birthday && formik.touched.birthday)}
										errorValue={formik.errors.birthday as any}
									>
										<Field
											name="birthday"
											render={({ field }: any) => (

												<input {...field} placeholder="__.__.____" type="date" value={formik.values.birthday}
													onChange={formik.handleChange} />


											)}
										/>
									</FormFieldWrapper>
								</div>
							</div>
							<div className="form-radio">
								<label htmlFor="male">Пол</label>
								<div className="form-radio__toggle">
									<div className="form-radio__toggle__item" onClick={()=> formik.setFieldValue("male","man") }>

									<input type="radio" name="male" checked={formik.values.male === "man"} />
										<div className="form-radio__toggle__item-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path d="M11 22C10.7167 22 10.4792 21.9042 10.2875 21.7125C10.0958 21.5208 10 21.2833 10 21V15H9C8.71667 15 8.47917 14.9042 8.2875 14.7125C8.09583 14.5208 8 14.2833 8 14V9C8 8.45 8.19583 7.97917 8.5875 7.5875C8.97917 7.19583 9.45 7 10 7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V14C16 14.2833 15.9042 14.5208 15.7125 14.7125C15.5208 14.9042 15.2833 15 15 15H14V21C14 21.2833 13.9042 21.5208 13.7125 21.7125C13.5208 21.9042 13.2833 22 13 22H11ZM12 6C11.45 6 10.9792 5.80417 10.5875 5.4125C10.1958 5.02083 10 4.55 10 4C10 3.45 10.1958 2.97917 10.5875 2.5875C10.9792 2.19583 11.45 2 12 2C12.55 2 13.0208 2.19583 13.4125 2.5875C13.8042 2.97917 14 3.45 14 4C14 4.55 13.8042 5.02083 13.4125 5.4125C13.0208 5.80417 12.55 6 12 6Z" />
											</svg>
										</div>
									</div>
									<div className="form-radio__toggle__item" onClick={()=> formik.setFieldValue("male","girl") }>
									<input type="radio" name="male" checked={formik.values.male === "girl"}/>
										<div className="form-radio__toggle__item-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path d="M11.0002 22C10.7169 22 10.4794 21.9042 10.2877 21.7125C10.096 21.5208 10.0002 21.2833 10.0002 21V16H8.47521C8.12521 16 7.85021 15.8542 7.65021 15.5625C7.45021 15.2708 7.41688 14.9583 7.55021 14.625L10.0502 8.3C10.2169 7.9 10.4752 7.58333 10.8252 7.35C11.1752 7.11667 11.5669 7 12.0002 7C12.4335 7 12.8252 7.11667 13.1752 7.35C13.5252 7.58333 13.7835 7.9 13.9502 8.3L16.4502 14.625C16.5835 14.9583 16.5502 15.2708 16.3502 15.5625C16.1502 15.8542 15.8752 16 15.5252 16H14.0002V21C14.0002 21.2833 13.9044 21.5208 13.7127 21.7125C13.521 21.9042 13.2835 22 13.0002 22H11.0002ZM12.0002 6C11.4502 6 10.9794 5.80417 10.5877 5.4125C10.196 5.02083 10.0002 4.55 10.0002 4C10.0002 3.45 10.196 2.97917 10.5877 2.5875C10.9794 2.19583 11.4502 2 12.0002 2C12.5502 2 13.021 2.19583 13.4127 2.5875C13.8044 2.97917 14.0002 3.45 14.0002 4C14.0002 4.55 13.8044 5.02083 13.4127 5.4125C13.021 5.80417 12.5502 6 12.0002 6Z" />
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="input__item input_icon input_icon_left">
							<label htmlFor="phone">Телефон</label>
							<div className="input__container">
							<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Телефон"
					isValid={
						formik.errors.phone
					}
					error={!!(formik.errors.phone && formik.touched.phone)}
					errorValue={formik.errors.phone}
					addfild={"input_icon_left input_icon_right"}
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
						<div className="input__item input_icon input_icon_left">
							<label htmlFor="mail">Почта</label>
							<div className="input__container">
								
							</div>
							<FormFieldWrapper
					placeholderIco={""}
					placeholderValue="Телефон"
					isValid={
						formik.errors.email
					}
					error={!!(formik.errors.email && formik.touched.email)}
					errorValue={formik.errors.email}
					addfild={"input_icon_left input_icon_right"}
				>
					<div className="input__container">
					<img src={require("assets/images/icons/email.png")} alt="" />
						<Field
							className="form__field-wrapper__input"
							name="email"
							placeholder="Почта"
							value={formik.values.email}
							onChange={formik.handleChange}
						/>
						
					</div>

				</FormFieldWrapper>
						</div>
						<label className="input__checkbox no-drag">
							<div className="checkbox">
								<Field type="checkbox" name="spam"/>
								<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5.71047 10.2901C5.32047 10.6801 4.69047 10.6801 4.30047 10.2901L0.710469 6.70006C0.320469 6.31006 0.320469 5.68006 0.710469 5.29006C1.10047 4.90006 1.73047 4.90006 2.12047 5.29006L5.00047 8.17006L11.8805 1.29006C12.2705 0.900059 12.9005 0.900059 13.2905 1.29006C13.6805 1.68006 13.6805 2.31006 13.2905 2.70006L5.71047 10.2901Z" fill="white"></path>
								</svg>
							</div>
							<p className="input__checkbox-label">Получать персональные предложения и акции</p>
						</label>
						<label>{error && "Произошла ошибка, попробуйте ещё раз или сообщите нам"}</label>
					</div>
					<div className="personal-buttons">
						<input type="submit" value="Сохранить" className="btn btn-md btn-red" />
						<NavLink to={PROFILE_ROUTE} className="btn btn-md btn-gray">
							Назад
						</NavLink>
					</div>
					
				</div>
			</form>
		</FormikProvider>
		</div>
		</LayoutDesctop>
	)
}
export default observer(HOCPersonalDesc) 