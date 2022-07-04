import { IReverveTable, IReverveTableValue } from "@types";
import schemaBuild, { shemaReserve } from "application/helpers/validationSchema";
import { ReserveReducer,initialStateReserve,ReducerActionTypePoints } from "application/reducers/ReserveReducer";
import { useFormik } from "formik";
import React, { FC, useReducer, useState } from "react";
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { RequestWebhook } from "servises/repository/Axios/Request";
import { compareAsc, format } from 'date-fns'

export function useReserveModal(this: any) {
	const point = adapterSelector.useSelectors(selector => selector.point)
    const workTimeArr = point.workTime.split('-').map(el => el.split(':'));
    // возможность бронирования на неделю
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 6);


	const [stateReserve, dispatchReserve] = useReducer(
    ReserveReducer,
    initialStateReserve
  );

    const initialValues: IReverveTableValue = {
        fullname: "",
        phone: "",
        date: new Date(),
        time: new Date(),
        person: "",
        startTime: new Date(new Date().setHours(+workTimeArr[0][0], +workTimeArr[0][1])),
        endTime: new Date(new Date().setHours(+workTimeArr[1][0], +workTimeArr[1][1])),
        maxDate: maxDate
    };



  const submitHandler = async (values:IReverveTableValue, meta:any) => {
		try {
			const data = {
				fullname: values.fullname,
        phone: values.phone,
        date: format(values.date, "yyyy-MM-dd"),
        time: format(values.time, "HH:mm"),
        person: values.person,
			}
			


			const result = await RequestWebhook.reverveTable({...data,organizationId:point.guid})
			result.status === 200 && dispatchReserve({
				type: ReducerActionTypePoints.setStatus,
				payload: true
			})
		} catch (error) {
			console.log(error);
			dispatchReserve({
				type: ReducerActionTypePoints.setStatus,
				payload: false
			});
		}
		meta.resetForm()
  }

  const onCloseSuccessHandler = () => {
      dispatchReserve({
          type: ReducerActionTypePoints.setStatus,
          payload: null
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: shemaReserve(),
    onSubmit: submitHandler
  });


    this.data({
        formik,
        point,
        stateReserve,
        ReducerActionTypePoints,
        onCloseSuccessHandler
    });
    this.handlers({
        dispatchReserve
    });
    this.status({});
}
