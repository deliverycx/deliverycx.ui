/* eslint-disable no-async-promise-executor */

import { FormikHelpers } from "formik";
import { store } from "servises/redux/createStore";
import { fetchAllCart, fetchOrderCart, setENErrors, setErrors } from "servises/redux/slice/cartSlice";
import { useHistory } from "react-router-dom";
import { format } from 'date-fns'

const submitHandler = async <T>(values: any, meta: FormikHelpers<any>) => {
    const storage = store.getState();
    meta.setSubmitting(true);
    new Promise(async (resolve, reject) => {
        //await store.dispatch(changePromoCode(''));
        //await store.dispatch(checkOut({...values,promocode,cart_choice,totalPrice}));

        // Разделение адреса на улицу и дом
				/*
        const prepareAddress: { street: string; home: string } =
            values.address &&
            values.address.match(/(?<street>.*?),\s?(?<home>.*)/).groups;

						if(prepareAddress.home && prepareAddress.home.length > 10){
							
							store.dispatch(setENErrors({
								status:500,
								error:{
									errors:"Номер дома слишком длинный"
								}
								
							}))
							return
						}
				*/
				
				if(values.house && values.house.length > 10){
							
					store.dispatch(setENErrors({
						status:500,
						error:{
							errors:"Номер дома слишком длинный"
						}
						
					}))
					return
				}


        const val = {
            organization: storage.location.point.id,
            name: values.name,
            date:`${format(new Date(), 'yyyy-MM-dd')} ${new Date().toLocaleTimeString()}`,
            address: {
                city: storage.location.point.city,
                street: values.address || "",
                home: values.house || "",
                flat: values.flat,
                intercom: values.intercom,
                entrance: values.entrance,
                floor: values.floor,
								kladrid:storage.cart.kladrid,
								cordAdress:storage.cart.cordAddress
            },
						
            orderType: values.orderType,
            phone: values.phone,
            comment: values.comment,
            paymentMethod: values.payment_method,
						localhost:`${document.location.protocol}//${document.location.host}`,
						orderTable:storage.cart.orderTable,
            ...values.paymentOrderCard,
        };


      const url = await store.dispatch(fetchOrderCart(val) as any);
      //'errors' in url.payload !== true
      if (url.payload && url.payload.redirectUrl) {
        if (typeof url.payload.redirectUrl === 'string') {
          resolve(true);
          window.location.href = url.payload.redirectUrl;
        }
        
      }
       
    }).then(() => {
        meta.setSubmitting(false);
    });
};

export default submitHandler;
