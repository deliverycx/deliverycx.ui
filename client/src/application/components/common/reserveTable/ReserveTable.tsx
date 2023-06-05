/* eslint-disable no-mixed-spaces-and-tabs */

import TextField from '@mui/material/TextField';
import React, { FC } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Field, FormikProvider } from "formik";
import InputMask from "react-input-mask";
import { compareAsc, format } from 'date-fns'
import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useReserveTable } from 'domain/use-case/useCaseWebhook/useCase.ReserveTable';
import FormFieldWrapper from '../Forms/FormFieldWrapper';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const ReserveTable:FC<{sucses:any}> = ({sucses}) => {
	const useCase = adapterComponentUseCase(useReserveTable,sucses)
	const { formik,
		point,
		stateReserve,
		ReducerActionTypePoints,
		onCloseSuccessHandler } = useCase.data
	const { dispatchReserve } = useCase.handlers


	const isDisabled = () => {
		return !stateReserve.timeValue || !formik.values.fullname || !formik.values.phone || !stateReserve.dateValue;
	}


	const mitTime = () => {
		function Formate<T extends number | Date>(date: T) {
			return format(date, "yyyy-MM-dd")
		}

		if (Formate(new Date()) === Formate(stateReserve.dateValue)) {
			return new Date()
		} else {
			return formik.values.startTime
		}
	}

	return (
		<FormikProvider value={formik}>
			<form onSubmit={formik.handleSubmit}>
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
					
					<div className="cart__form container">
						<div className="cart__memo__banner pickup">
							<div className="city-info">
								<span className="mark"></span>
								{point.address}
							</div>

						</div>
						<br />
						<FormFieldWrapper
							isValid={!formik.values.fullname.length || formik.errors.fullname}
							error={!!(formik.errors.fullname && formik.touched.fullname)}
							errorValue={formik.errors.fullname} placeholderIco={''} placeholderValue={''}                      >
							<Field
								className="form__field-wrapper__input"
								name="fullname"
								placeholder="Имя"
								value={formik.values.fullname}
								onChange={formik.handleChange}
							/>
						</FormFieldWrapper>
						<FormFieldWrapper
							isValid={!formik.values.phone.length || formik.errors.phone}
							error={!!(formik.errors.phone && formik.touched.phone)}
							errorValue={formik.errors.phone} placeholderIco={''} placeholderValue={''}                      >
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
						<FormFieldWrapper
							isValid={!formik.values.person.length || formik.errors.person}
							error={!!(formik.errors.person && formik.touched.person)}
							errorValue={formik.errors.person} placeholderIco={''} placeholderValue={''}                      >
							<Field
								className="form__field-wrapper__input"
								name="person"
								placeholder="Количество гостей"
								value={formik.values.person}
								onChange={formik.handleChange}
							/>
						</FormFieldWrapper>
						<div className="date-and-time-container">
							<div className="date-and-time_box">
								<MobileDatePicker

									label="Дата"
									value={stateReserve.dateValue}
									onChange={(newValue) => {
										if (newValue) {
											formik.setFieldValue("date", newValue);
											dispatchReserve({
												type: ReducerActionTypePoints.setDate,
												payload: newValue //format(newValue, "yyyy-MM-dd")
											});
										}
									}}
									className="time-picker"
									disablePast={true}
									maxDate={formik.initialValues.maxDate}
								/>
							</div>

							<div className="date-and-time_box">


								<MobileTimePicker
									label="Время"
									value={stateReserve.timeValue}

									onChange={(newValue: any) => {

										const value = formik.values.endTime < newValue ? formik.values.endTime : newValue
										formik.setFieldValue("time", value);
										dispatchReserve({
											type: ReducerActionTypePoints.setTime,
											payload: value
										});
									}}

									minTime={mitTime()}
									maxTime={formik.values.endTime}
								/>

							</div>
						</div>
					</div>
				</LocalizationProvider>
				<button
					type="submit"
					className="cart__order-btn btn reserve-btn"
					disabled={isDisabled()}
				>
					Забронировать
				</button>
				{
					stateReserve.success === false && typeof stateReserve.success !== null &&
					<div className="error">Произошла ошибка</div>
				}
			</form>
		</FormikProvider>
	)
}
export default ReserveTable