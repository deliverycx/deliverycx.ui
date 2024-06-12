import { FC, useContext, useEffect, useRef, useState } from 'react';
import ModalCard from '../../Modals/ModalCard';
import RequestWebhook from 'shared/api/Request/Request.Webhook';
import { DeliveryMapContext } from './HOC.DeliveryMap';
import { useQuery } from 'react-query';
import LoaderProduct from '../../Loaders/loaderProduct';

type IProps = {
	setModalStreet: any;
};

export type IIkkoStreet = {
	id: string;
	name: string;
	externalRevision: number;
	classifierId: string;
	isDeleted: boolean;
};

const DeliveryAdressSelect: FC<IProps> = ({ setModalStreet }) => {
	const useCase = useContext(DeliveryMapContext);
	const { formik, stateReduceMap, ikkostreet } = useCase.data;
	const { onMapTyping } = useCase.handlers;
	const { isLoading } = useCase.status;

	const inputRef = useRef<any>();

	const [serchInp, setSerchInp] = useState<string>(
		(stateReduceMap.valueMap && stateReduceMap.valueMap.name) || '',
	);
	const [streets, setStreets] = useState<IIkkoStreet[] | null>(null);

	useEffect(() => {
		if (!isLoading) {
			ikkostreet &&
				serchInp &&
				searchHandle(serchInp, ikkostreet.data as IIkkoStreet[]);
		}
	}, [ikkostreet, isLoading, serchInp]);

	const handlerСhooseAdress = (val: IIkkoStreet) => {
		onMapTyping().setValueFomMap(null);
		onMapTyping().setValueMap(val);
		formik.setFieldValue('address', val.name);
		setModalStreet(false);
	};

	const halderSerchInp = (value: string) => {
		setSerchInp(value);
		inputRef.current = null;
	};

	function searchHandle(s: any, arr: IIkkoStreet[]) {
		const resulr = arr.filter(function (el: IIkkoStreet) {
			if (!el.isDeleted) {
				return el.name.toUpperCase().indexOf(s.toUpperCase()) > -1; //el.name.indexOf(s) > -1;
			}
		});
		if (resulr.length !== 0) {
			setStreets(resulr);
		} else {
			setStreets(null);
		}
	}

	return (
		<div className="delivery-addresses authorized">
			<div className="top-bar">
				<div className="top-bar__left">
					<div
						onClick={() => setModalStreet(false)}
						className="d-flex flex-center justify-center modal__btn no-drag flex-column"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M19 11.0002H7.82998L12.71 6.12021C13.1 5.73021 13.1 5.09021 12.71 4.70021C12.32 4.31021 11.69 4.31021 11.3 4.70021L4.70998 11.2902C4.31998 11.6802 4.31998 12.3102 4.70998 12.7002L11.3 19.2902C11.69 19.6802 12.32 19.6802 12.71 19.2902C13.1 18.9002 13.1 18.2702 12.71 17.8802L7.82998 13.0002H19C19.55 13.0002 20 12.5502 20 12.0002C20 11.4502 19.55 11.0002 19 11.0002Z"
								fill="#8D191D"
							/>
						</svg>
					</div>
					<h3>Выберите из списка улицу</h3>
				</div>
			</div>
			<div className="orders__list">
				<div className="input__item flex-big no-drag">
					<div className="input__container">
						<input
							type="text"
							placeholder="Улица"
							name="address"
							onChange={(e) => halderSerchInp(e.target.value)}
							value={inputRef.current || serchInp}
						/>
					</div>
				</div>
				<hr />
				{serchInp && isLoading && <LoaderProduct />}
				{serchInp && streets && (
					<div className="ikkostreet_box">
						{streets &&
							streets.map((val: IIkkoStreet) => {
								return (
									<div
										key={val.id}
										className="ikkostreet_box-item"
										onClick={() => handlerСhooseAdress(val)}
									>
										{val.name}
									</div>
								);
							})}
					</div>
				)}
			</div>
		</div>
	);

	/*
	return (

		<div className="modal modal_fullpage">
			<div className="modal__wrapper">
				<div className="modal__header">

					<div onClick={() => setModal(false)} className="d-flex flex-center justify-center modal__btn no-drag flex-column">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M19 11.0002H7.82998L12.71 6.12021C13.1 5.73021 13.1 5.09021 12.71 4.70021C12.32 4.31021 11.69 4.31021 11.3 4.70021L4.70998 11.2902C4.31998 11.6802 4.31998 12.3102 4.70998 12.7002L11.3 19.2902C11.69 19.6802 12.32 19.6802 12.71 19.2902C13.1 18.9002 13.1 18.2702 12.71 17.8802L7.82998 13.0002H19C19.55 13.0002 20 12.5502 20 12.0002C20 11.4502 19.55 11.0002 19 11.0002Z" fill="#8D191D" />
						</svg>
					</div>
					<h3>Выберите из списка улицу</h3>

				</div>
				<div className="modal__content gap-8">
					<div className="input__item flex-big no-drag">

						<div className="input__container">
							<input type="text" placeholder="Улица" name="address" onChange={e => halderSerchInp(e.target.value)} value={inputRef.current || serchInp} />

						</div>
					</div>
					<hr />
					{
						serchInp && isLoading &&
						<LoaderProduct />
					}
					{
						serchInp && streets &&
						<div className="ikkostreet_box">

							{
								streets && streets.map((val: IIkkoStreet) => {
									return <div key={val.id} className="ikkostreet_box-item" onClick={() => handlerСhooseAdress(val)} >{val.name}</div>
								})
							}


						</div>
					}

				</div>
			</div>
		</div>

	)
	*/
};
export default DeliveryAdressSelect;
