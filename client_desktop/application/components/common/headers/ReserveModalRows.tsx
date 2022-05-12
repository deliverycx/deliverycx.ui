import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCartItems } from "domain/use-case/useCaseCart";
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import React, { FC, useState } from "react";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Field } from "formik";
import InputMask from "react-input-mask";
import { useFormik, FormikProvider } from "formik";

type IProps = {
    empty:any
}

const ReserveModalRows:FC<IProps> = ({empty}) => {
    const useCaseCart = adapterComponentUseCase(useCartItems,empty)
    const {debounceClearHandler} = useCaseCart.handlers
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const formik = useFormik({});

    // @ts-ignore
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <div className="rows-container">
            <div className="name">
                <input type="text" name="" id="" placeholder="Фамилия Имя" />
            </div>
            <div className="phone">
                {/*<input type="text" name="" id="" placeholder="Телефон" />*/}
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
            </div>
            <div className="date-and-time-container">
                <div>
                    <MobileDatePicker
                        inputFormat="dd.MM.yyyy"
                        renderInput={(params) => <TextField
                            className='date-text'
                            InputProps={{ className: 'date-input', }}
                            {...params}
                        />}

                        label="Дата"
                        value={dateValue}
                        onChange={(newValue) => {
                            // @ts-ignore
                            setDateValue(newValue);
                        }}

                        // renderInput={(params) => <TextField
                        //     id="date"
                        //     className='date-text'
                        //     margin="normal"
                        //     InputProps={{
                        //         className: 'date-input',
                        //     }}
                        // />}
                    />
                </div>
                <div className="guests">
                    <input type="text" name="" id="" placeholder="25 гостей" />
                </div>
                <div>
                    <TimePicker
                        label="Время"
                        value={timeValue}
                        onChange={(newValue) => {
                            // @ts-ignore
                            setTimeValue(newValue);
                        }}
                        renderInput={(params) => {
                            return <>
                                {console.log(params)}
                                <TextField {...params} />
                            </>
                        } }
                    />
                </div>
            </div>
        </div>
        </LocalizationProvider>
    )
}

export default ReserveModalRows
