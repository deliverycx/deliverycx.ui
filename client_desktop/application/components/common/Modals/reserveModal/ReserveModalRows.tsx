import { adapterComponentUseCase } from "adapters/adapterComponents";
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import TextField from '@mui/material/TextField';
import React, { FC, useState } from "react";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Field, FormikProvider } from "formik";
import InputMask from "react-input-mask";
import { useReserveModal } from "domain/use-case/useCaseWebhook";
import FormFieldWrapper from "../../Forms/FormFieldWrapper";
import { compareAsc, format } from 'date-fns'


const ReserveModalRows = () => {
  const useCaseReserve = adapterComponentUseCase(useReserveModal)
  const {formik,point,ReducerActionTypePoints,stateReserve} = useCaseReserve.data
  const {dispatchReserve} = useCaseReserve.handlers
    const now = Date.now();

  return (
    <FormikProvider value={formik}>
    <form onSubmit={formik.handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <div className="rows-container">
				<div className="welcome__select-adress__info street">
               <img
                  src="/images/i/mark-red.svg"
                  alt="Телефон заведения"
               />

               {point.address}
            </div>
        <FormFieldWrapper
            isValid={
              !formik.values.fullname.length || formik.errors.fullname
            }
            error={!!(formik.errors.fullname && formik.touched.fullname)}
            errorValue={formik.errors.fullname}
          >
            <Field
              className="form__field-wrapper__input"
              name="fullname"
              placeholder="Ваше имя"
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />
        </FormFieldWrapper>
        <FormFieldWrapper
            isValid={
              !formik.values.phone.length || formik.errors.phone
            }
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
                  placeholder="Ваш телефон"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              )}
            />
            </FormFieldWrapper>
            <FormFieldWrapper
              isValid={
                !formik.values.person.length || formik.errors.person
              }
              error={!!(formik.errors.person && formik.touched.person)}
              errorValue={formik.errors.person}
            >
              <Field
                className="form__field-wrapper__input"
                name="person"
                placeholder="Количество персон"
                value={formik.values.person}
                onChange={formik.handleChange}
              />
              </FormFieldWrapper>
            <div className="date-and-time-container">
              <div className="date-and-time_box">
              <FormFieldWrapper
                isValid={
                  !stateReserve.dateValue || formik.errors.date
                }
                error={!!(formik.errors.date && formik.touched.date)}
                errorValue={formik.errors.date}
              >
                  <MobileDatePicker
                      inputFormat="dd.MM.yyyy"
                      renderInput={(params) => <TextField
                          className="date-text"
                          InputProps={{ className: "date-input" , style:{outline:'#8D191D' }}}
                          {...params}
                          InputLabelProps={{
                              style: {
                                color: '#666666'
                              }
                          }
                          }
                      />}
                      label="Дата"
                      value={stateReserve.dateValue}
                      onChange={(newValue) => {
                          if (newValue) {
                              formik.setFieldValue("date", format(newValue, "yyyy-MM-dd"));
                              dispatchReserve({
                                  type: ReducerActionTypePoints.setDate,
                                  payload: format(newValue, "yyyy-MM-dd")
                              });
                          }
                      }}
                      minDate={new Date()}
                      maxDate={formik.initialValues.maxDate}
                  />
                  </FormFieldWrapper>
                </div>

              <div className="date-and-time_box">
              <FormFieldWrapper
                isValid={
                  !stateReserve.timeValue || formik.errors.time
                }
                error={!!(formik.errors.time && formik.touched.time)}
                errorValue={formik.errors.time}
              >
                  {/*if (newValue && newValue !== "Invalid Date")*/}
                  <MobileTimePicker
                      label="Время"
                      value={stateReserve.timeValue}
                      onChange={(newValue, value) => {
                          formik.setFieldValue("time", newValue);
                              dispatchReserve({
                                  type: ReducerActionTypePoints.setTime,
                                  payload: newValue
                              });
                      }}
                      renderInput={(params) => {
                          return <>
                              <TextField {...params}
                                         InputLabelProps={{
                                             style: {
                                                 color: "#666666"
                                             }
                                         }
                                         }
                              />
                          </>;
                      }}
                      minTime={now > formik.initialValues.startTime ? new Date() : formik.initialValues.startTime}
                      maxTime={formik.initialValues.endTime}
                  />
                  </FormFieldWrapper>
                </div>
            </div>
        </div>
        </LocalizationProvider>
        <button
              type="submit"
              className="cart__order-btn btn"
            >
              Забронировать
          </button>
					{
						stateReserve.sucsess && typeof stateReserve.sucsess !== null && <div className="sucsess">Ваш столик успешно заказан</div>
					}
					{
						stateReserve.sucsess === false && typeof stateReserve.sucsess !== null && <div className="error">Произошла ошибка</div>
					}
      </form>
      </FormikProvider>
    )
}

export default ReserveModalRows
