import MobileTimePicker from '@mui/lab/MobileTimePicker';
import TextField from '@mui/material/TextField';
import React from "react";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Field, FormikProvider } from "formik";
import InputMask from "react-input-mask";
import FormFieldWrapper from "../../Forms/FormFieldWrapper";
import { compareAsc, format } from 'date-fns'

const ReserveModalRows = ({reserveProps}:any) => {
    const {formik,point,ReducerActionTypePoints,stateReserve,dispatchReserve} = reserveProps
    const now = Date.now();

    const isDisabled = () => {
      return !stateReserve.timeValue || !formik.values.fullname || !formik.values.phone || !stateReserve.dateValue;
    }


	const mitTime = () =>{
		function Formate<T extends number | Date>(date:T) {
			return format(date, "yyyy-MM-dd")
		}

		if(Formate(new Date()) === Formate(stateReserve.dateValue)){
			return new Date()
		}else{
			return formik.values.startTime
		}
	}


  return (
      <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                  <div className="rows-container">
                      <div className="welcome__select-adress__info street">
                          <img src="/images/i/mark-red.svg" alt="Телефон заведения" />
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
                              placeholder="Количество гостей"
                              value={formik.values.person}
                              onChange={formik.handleChange}
                          />
                      </FormFieldWrapper>
                      <div className="date-and-time-container">
                          <div className="date-and-time_box">
                              <MobileDatePicker
                                  inputFormat="dd.MM.yyyy"
                                  renderInput={(params) => <FormFieldWrapper
                                      isValid={
                                          !stateReserve.dateValue || formik.errors.date
                                      }
                                      error={!!(formik.errors.date && formik.touched.date)}
                                      errorValue={formik.errors.date}
                                  ><TextField
                                      className="date-text"
                                      InputProps={{ className: "date-input", style: { outline: "#8D191D" } }}
                                      {...params}
                                      InputLabelProps={{
                                          style: {
                                              color: "#ABABAB",
                                              fontFamily: "manrope",
                                              fontWeight: 600,
                                          }
                                      }
                                      }
                                  /></FormFieldWrapper>}
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
																			
                                      onChange={(newValue) => {
                                          
																					const value = formik.values.endTime < newValue ? formik.values.endTime : newValue
																					formik.setFieldValue("time", value);
                                          dispatchReserve({
                                              type: ReducerActionTypePoints.setTime,
                                              payload: value
                                          });
                                      }}
                                      renderInput={(params) => {
                                          return <>
                                              <TextField {...params}
                                                         InputLabelProps={{
                                                             style: {
                                                                 color: "#ABABAB",
                                                                 fontFamily: "manrope",
                                                                fontWeight: 600,
                                                             }
                                                         }
                                                         }
                                              />
                                          </>;
                                      }}
                                      minTime={mitTime()}
                                      maxTime={formik.values.endTime}
                                  />
                              </FormFieldWrapper>
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

export default ReserveModalRows
