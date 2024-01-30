import ModalCard from 'application/components/common/Modals/ModalCard';
import { shemaReserve } from 'application/guards/validationSchema';
import { FC, useState } from 'react';
import { Field, FormikProvider, useFormik } from "formik";
import { compareAsc, format } from 'date-fns'
import InputMask from "react-input-mask";
import { observer } from 'mobx-react-lite';
import { organizationModel, organizationStatusModel } from 'modules/OrganizationModule/organization.module';
import FormFieldWrapper from 'application/components/common/Forms/FormFieldWrapper';
import RequestWebhook from 'servises/Request/Request.Webhook';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';


export interface IReverveTableValue {
	fullname: string,
	phone: string,
	date: string,
	time: string,
	person: string,
}


const OrganizationTableRestaurant:FC<{organization:IOrganization}> = ({organization}) => {
	const [tableModal, setTableModal] = useState(false)
	const [tableModalSucsses, settableModalSucsses] = useState(false)
	const { selectOrganization } = organizationModel
	const {timeworkOrganization} = organizationStatusModel

	const maxDate = new Date();
	const maxDateValue = format(maxDate.setDate(maxDate.getDate() + 6), "yyyy-MM-dd")
	const minDateValue = format(maxDate.setDate(maxDate.getDate() - 6), "yyyy-MM-dd")

	const initialValues: IReverveTableValue = {
		fullname: "",
		phone: "",
		date: format(new Date(), "yyyy-MM-dd"),
		time: format(new Date(), "HH:mm"),
		person: "",

	};

	const submitHandler = async (values: IReverveTableValue, meta: any) => {
		try {

			if (timeworkOrganization) {
				const workTimeArr = timeworkOrganization?.todaytime.map((el: any) => el.split(':'))

				const startTime = format(new Date(new Date().setHours(+workTimeArr[0][0], +workTimeArr[0][1])), "HH:mm")

				const endTimeDate = new Date()
				endTimeDate.setHours(+workTimeArr[1][0], +workTimeArr[1][1])
				const endTime = format(endTimeDate.setMinutes(- 30), "HH:mm")



				if (startTime > values.time) {
					formik.setErrors({ time: `можно заказать с ${timeworkOrganization.todaytime[0]}` })
					return
				} else if (endTime < values.time) {
					formik.setErrors({ time: `можно заказать до ${endTime}` })
					return
				}

			}
			const bodyform = {
				fullname: values.fullname,
				phone: values.phone,
				date: values.date,
				time: values.time,
				person: values.person,
			}

			const { data } = await RequestWebhook.reverveTable({ ...bodyform, organizationId: selectOrganization?.guid })
			if (data) {
				setTableModal(false)
				settableModalSucsses(true)
			}

		} catch (error) {
			console.log(error);
		}

	}

	const formik = useFormik({
		initialValues,
		validationSchema: shemaReserve(),
		onSubmit: submitHandler
	});


	




	return (
		<>
			{
				selectOrganization && selectOrganization.reservetable &&
				<button onClick={() => setTableModal(true)} className="btn btn-mini btn-gray no-drag">
					<img src={require("assets/images/icons/table_restaurant.png")} alt="" />
					Забронировать столик
				</button>
			}
			
			{tableModalSucsses &&
				<ModalCard setIsOpened={settableModalSucsses} theme="children-pre">

					<div className="modal__wrapper">
						<div className="modal__header">
							<svg className="no-drag" onClick={() => settableModalSucsses(false)} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M30.3 17.71C29.91 17.32 29.28 17.32 28.89 17.71L24 22.59L19.11 17.7C18.72 17.31 18.09 17.31 17.7 17.7C17.31 18.09 17.31 18.72 17.7 19.11L22.59 24L17.7 28.89C17.31 29.28 17.31 29.91 17.7 30.3C18.09 30.69 18.72 30.69 19.11 30.3L24 25.41L28.89 30.3C29.28 30.69 29.91 30.69 30.3 30.3C30.69 29.91 30.69 29.28 30.3 28.89L25.41 24L30.3 19.11C30.68 18.73 30.68 18.09 30.3 17.71Z" fill="#8D191D" />
							</svg>
							<h3>Ваша заявка отправлена</h3>
						</div>
						<div className="modal__content gap-8">
							<p>
								В ближайшее время с вами свяжется наш администратор и уточнит детали
							</p>
							<button onClick={() => {
								settableModalSucsses(false)
								setTableModal(false)
							}
							} className="btn btn-sm btn-red no-drag">
								Хорошо
							</button>
						</div>
					</div>

				</ModalCard>
			}
			{tableModal &&
				<ModalCard setIsOpened={setTableModal}>
					<div className="modal">
						<div className="modal__wrapper">
							<div className="modal__header">
								<div className="modal__header-btn">
									<img className="no-drag" onClick={() => setTableModal(false)} src={require("assets/images/icons/close.png")} alt="" />
								</div>
								<h3>Забронировать столик</h3>
							</div>
							<FormikProvider value={formik}>
								<form onSubmit={formik.handleSubmit}>
									<div className="modal__content gap-8">
										<div className="input__item input_icon no-drag input_icon_left">
											<label htmlFor="address">Заведение</label>
											<div className="input__container">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 21.625C11.8667 21.625 11.7333 21.6 11.6 21.55C11.4667 21.5 11.35 21.4333 11.25 21.35C8.81667 19.2 7 17.2042 5.8 15.3625C4.6 13.5208 4 11.8 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8 19.4 13.5208 18.2 15.3625C17 17.2042 15.1833 19.2 12.75 21.35C12.65 21.4333 12.5333 21.5 12.4 21.55C12.2667 21.6 12.1333 21.625 12 21.625Z" fill="#999999" />
												</svg>
												<input value={`${selectOrganization?.info.address}, ${selectOrganization?.info.city}`} name="address" type="text" />



											</div>
										</div>
										<div className="d-flex flex-center gap-8">
											<div className="input__item no-drag">
												<label htmlFor="name">Имя</label>
												<div className="input__container">
													<FormFieldWrapper
														isValid={formik.errors.fullname}
														error={!!(formik.errors.fullname && formik.touched.fullname)}
														errorValue={formik.errors.fullname}
													>
														<Field
															className="form__field-wrapper__input"
															name="fullname"
															placeholder="Как к вам обращаться"
															value={formik.values.fullname}
															onChange={formik.handleChange}
														/>
													</FormFieldWrapper>
												</div>
											</div>

										</div>
										<div className="d-flex flex-center gap-8">
											<div className="input__item no-drag">
												<label htmlFor="phone">Телефон</label>
												<div className="input__container">
													<FormFieldWrapper
														isValid={formik.errors.phone}
														error={!!(formik.errors.phone && formik.touched.phone)}
														errorValue={formik.errors.phone}
													>
														<Field
															name="phone"
															render={({ field }: any) => (
																<InputMask
																	{...field}
																	mask="+7 999 999 99 99"
																	maskPlaceholder={null}
																	className="form__field-wrapper__input"
																	placeholder="Телефон"
																	value={formik.values.phone}
																	onChange={formik.handleChange}
																/>
															)}
														/>
													</FormFieldWrapper>


												</div>
											</div>
											<div className="input__item no-drag">
												<label htmlFor="person">Персон</label>
												<div className="input__container">
													<FormFieldWrapper
														isValid={formik.errors.person}
														error={!!(formik.errors.person && formik.touched.person)}
														errorValue={formik.errors.person}
													>
														<Field
															className="form__field-wrapper__input"
															name="person"
															placeholder="Количество Персон"
															value={formik.values.person}
															onChange={formik.handleChange}
														/>
													</FormFieldWrapper>
												</div>
											</div>
										</div>
										<div className="d-flex flex-center gap-8">
											<div className="input__item no-drag">
												<label htmlFor="date">Дата</label>
												<div className="input__container">
													<FormFieldWrapper
														isValid={formik.errors.date as any}
														error={!!(formik.errors.date && formik.touched.date)}
														errorValue={formik.errors.date as any}
													>
														<Field
															name="date"
															render={({ field }: any) => (

																<input {...field} placeholder="__.__.____" type="date" max={maxDateValue} min={minDateValue} value={formik.values.date}
																	onChange={formik.handleChange} />

															)}
														/>
													</FormFieldWrapper>

												</div>
											</div>
											<div className="input__item no-drag">
												<label htmlFor="time">Время</label>
												<div className="input__container">
													<FormFieldWrapper
														isValid={formik.errors.time}
														error={!!(formik.errors.time && formik.touched.time)}
														errorValue={formik.errors.time}
													>
														<Field
															name="time"

															render={({ field }: any) => (

																<input {...field} placeholder="__:__" type="time" value={formik.values.time as any}
																	onChange={formik.handleChange} />

															)}
														/>
													</FormFieldWrapper>


												</div>
											</div>
										</div>
										<p>
											После заполнения заявки с вами свяжется администратор
										</p>

										<button
											type="submit"
											className="btn btn-sm btn-red no-drag">
											Забронировать
										</button>
										<button onClick={() => setTableModal(false)} className="btn btn-sm btn-gray no-drag">
											Отменить
										</button>
									</div>

								</form>
							</FormikProvider>



						</div>
					</div>
				</ModalCard>
			}
		</>
	)
}
export default observer(OrganizationTableRestaurant)