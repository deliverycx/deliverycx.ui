import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetStreetCityQuery } from "servises/repository/RTK/RTKLocation"
import { FC, useEffect, useState, useRef } from 'react';
import { IIkkoStreet } from "@types";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { useDispatch } from "react-redux";
import { setKladrId, setAdress, setOrderInfo } from "servises/redux/slice/cartSlice";

type IProps = {
	formik: any
}

const CartAdresSelect: FC<IProps> = ({ formik }) => {
	const dispatch = useDispatch();
	const { orderInfo } = adapterSelector.useSelectors((selector) => selector.cart);
	const [streets, setStreets] = useState<IIkkoStreet[] | null>(null)
	const [serchInp, setSerchInp] = useState<string>('')


	const inputRef = useRef<any>();

	const point = adapterSelector.useSelectors(selector => selector.point)
	const { data: ikkostreet, isLoading: isLoadingStreet } = useGetStreetCityQuery({
		organizationId: point.guid,
	})


	function searchHandle(s: any, arr: IIkkoStreet[]) {
		const resulr = arr.filter(function (el: IIkkoStreet) {
			if (!el.isDeleted) {
				return el.name.toUpperCase().indexOf(s.toUpperCase()) > -1 //el.name.indexOf(s) > -1;
			}

		});
		if (resulr.length !== 0) {
			setStreets(resulr)
		} else {
			setStreets(null)
		}

	}

	const handlerСhooseAdress = (adress: IIkkoStreet) => {
		setStreets(null)
		setSerchInp('')
		inputRef.current = adress.name
		//dispatch(setKladrId(adress.classifierId))
		//dispatch(setAdress(adress.name));
		/*
		dispatch(setOrderInfo({
			address:adress.name,
			kladrid:adress.classifierId
		}))
		*/
		formik.setFieldValue("address", adress.name)
		formik.setFieldValue("kladrid",adress.classifierId)

	}

	const handlerChangeHouse = (value: string) => {
		formik.setFieldValue("house", value)
		/*
		dispatch(setOrderInfo({
			house:value,
		}))
		*/
	}

	const halderSerchInp = (value:string) =>{
		setSerchInp(value)
		inputRef.current = null
	}


	useEffect(() => {
		if (!isLoadingStreet) {
			(ikkostreet && serchInp) && searchHandle(serchInp, ikkostreet)
		}

		//console.log(isLoadingStreet,ikkostreet,serchInp);

	}, [ikkostreet, isLoadingStreet, serchInp])



	return (
		<div className="onspot_box__select onspot_box__select-full">
			<div className="onspot_box_dual">
				<div className="onspot_select_def" >
					<input type="text" placeholder="Улица" name="address" onChange={e => halderSerchInp(e.target.value)} value={inputRef.current || serchInp || formik.values.address} />


				</div>
				<div className="onspot_select_def def_house" >
					<input type="text" placeholder="Дом" name="house" defaultValue={formik.values.house} onChange={e => handlerChangeHouse(e.target.value)} />
				</div>
			</div>

			{
				serchInp && isLoadingStreet &&
				<div className="onspot_select">
					<LoaderProduct />
				</div>

			}
			{
				serchInp && streets &&
				<div className="onspot_select">
					{
						streets && streets.map((val: IIkkoStreet) => {
							return <div key={val.id} className="onspot_select_item" onClick={() => handlerСhooseAdress(val)} >{val.name}</div>
						})
					}

				</div>
			}




		</div>
	)
}

export default CartAdresSelect