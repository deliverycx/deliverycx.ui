import { adapterSelector } from "servises/redux/selectors/selectors"
import { useGetStreetCityQuery } from "servises/repository/RTK/RTKLocation"
import { FC, useEffect, useState } from 'react';
import { IIkkoStreet } from "@types";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import { useDispatch } from "react-redux";
import { setKladrId, setAdress } from "servises/redux/slice/cartSlice";

type IProps = {
	formik:any
}

const CartAdresSelect:FC<IProps> = ({formik}) => {
	const dispatch = useDispatch();
	const { address } = adapterSelector.useSelectors((selector) => selector.cart);
	const [streets, setStreets] = useState<IIkkoStreet[] | null>(null)
	const [serchInp, setSerchInp] = useState<string | null>(null)
	const [inputAdress, setInputAdress] = useState<boolean>(false)
	const [inputHouse, setInputHouse] = useState<boolean>(false)

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

	const handlerСhooseAdress = (adress:IIkkoStreet) =>{
		setStreets(null)
		setSerchInp(null)
		setInputAdress(false)
		dispatch(setKladrId(adress.classifierId))
		dispatch(setAdress(adress.name));
		formik.setFieldValue("address", adress.name)
	}

	const handlerChangeHouse = (value:string) =>{
		formik.setFieldValue("house", value)

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
					{
						!inputAdress 
						? <span className="choseadress" onClick={() => setInputAdress(true)}>{formik.values.address}</span>
						: <input type="text" placeholder="Улица" defaultValue={formik.values.address} onChange={e => setSerchInp(e.target.value)} />
					}
					
					
				</div>
				<div className="onspot_select_def def_house" >
					<input type="text" placeholder="Дом" defaultValue={formik.values.house} onChange={e => handlerChangeHouse(e.target.value)} />
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
							return <div key={val.id} className="onspot_select_item" onClick={()=> handlerСhooseAdress(val)} >{val.name}</div>
						})
					}

				</div>
			}




		</div>
	)
}

export default CartAdresSelect