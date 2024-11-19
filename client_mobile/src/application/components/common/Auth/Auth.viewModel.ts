import { valid } from 'application/helpers/validationSchema';

import { useFormik } from 'formik';
import { requestUser } from 'modules/UserModule/data/user.request';
import { useState } from 'react';
import * as yup from 'yup';

export function useAuthViewModel(this: any) {
	const [sendSMS, setSendSMS] = useState<string | boolean | null>(null);

	const initialValues = {
		phone: '',
		password: '',
		confirmPassword: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema: yup.object().shape({
			phone: valid.phone,
			password: yup
				.string()
				.required('Пароль обезателен')
				.min(5, 'Ваш пароль слишком короткий.'),
			//.matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
		}),
		onSubmit: (values, meta) => {
			handlerSMSSend(values.phone);
		},
	});

	const handlerSMSSend = async (phone: string) => {
		try {
			if (phone) {
				const { data } = await requestUser.smsSend({ phone });

				if (data && typeof data === 'number') {
					setSendSMS(String(data));
				} else {
					setSendSMS(false);
				}
			}
		} catch (error) {
			setSendSMS(false);
		}
	};


	this.data({
		formik,
		sendSMS,
	});
	this.handlers({
		setSendSMS,
	});
	this.status({});
}
