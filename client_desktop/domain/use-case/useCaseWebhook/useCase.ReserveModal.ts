import { IReverveTable } from "@types";
import schemaBuild, { shemaReserve } from "application/helpers/validationSchema";
import { ReserveReducer,initialStateReserve,ReducerActionTypePoints } from "application/reducers/ReserveReducer";
import { useFormik } from "formik";
import React, { FC, useReducer, useState } from "react";
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { RequestWebhook } from "servises/repository/Axios/Request";

export function useReserveModal(this: any) {
	const point = adapterSelector.useSelectors(selector => selector.point)

	type Tvalue = Omit<IReverveTable, "organizationId">

	const [stateReserve, dispatchReserve] = useReducer(
    ReserveReducer,
    initialStateReserve
  );
  
  const initialValues:Tvalue = {
    fullname: "",
    phone: "",
    date: "",
    time: "",
    person:""
  };

	

  const submitHandler = async (values:Tvalue, meta:any) => {
		try {
			const result = await RequestWebhook.reverveTable({...values,organizationId:point.guid})
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

  const formik = useFormik({
    initialValues,
    validationSchema: shemaReserve(),
    onSubmit: submitHandler
  });


  
  this.data({
    formik,
		point,
		stateReserve,
		ReducerActionTypePoints
  })
  this.handlers({
		dispatchReserve
  })
  this.status({

  })
}