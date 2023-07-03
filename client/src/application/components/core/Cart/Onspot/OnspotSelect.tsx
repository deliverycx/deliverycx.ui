/* eslint-disable @typescript-eslint/no-var-requires */
import { useState } from 'react';
import { RequestCart } from 'servises/repository/Axios/Request';
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrderTable } from 'servises/redux/slice/cartSlice';
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { ROUTE_APP } from 'application/contstans/route.const';

const OnspotSelect = () => {
	const history = useHistory();
	const point = adapterSelector.useSelectors(selector => selector.point)
	const cart = adapterSelector.useSelectors(selector => selector.cart)
	const [select, setSelect] = useState(false)
	const [table, setTables] = useState<any>()
	const dispatch = useDispatch()

	useEffect(() => {
		getAllTable()
	}, [])

	const getAllTable = async () => {
		try {
			const { data } = await RequestCart.orgTables(point.guid)
			console.log(data);
			if (data && data.length !== 0) {
				if (data.length > 1) {
					data.forEach((section: any) => {
						if (section.name === "С собой (СС)" && cart.orderTable.section === section.idsection) {
							console.log(section.tables);
							dispatch(setOrderTable({
								section: 'fake',
								id: section.tables[0].id,
								numb: section.tables[0].number
							}))
						}
					});
					return
				}

				const t = data[0]
				setTables(t)

				if (!cart.orderTable) {
					dispatch(setOrderTable({
						section: t.idsection,
						id: t.tables[0].id,
						numb: t.tables[0].number
					}))
				}

			} else {
				dispatch(setOrderTable(null))
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handlTable = (table: any) => {
		dispatch(setOrderTable(table))
		setSelect(false)
	}

	const resetTable = () =>{
		handlTable(null)
		history.push(ROUTE_APP.SHOP.SHOP_MAIN)
	}
	



	return (
		<div className="onspot_box">
			{
				cart.orderTable && cart.orderTable.section === 'fake'
					?
					<>
						<div className="onspot_box__adress">
							<div className="row form__field-wrapper__address">
								<div className="adress_fild__address">


									<strong>Предварительный заказ</strong>

								</div>

							</div>

						</div>
						<div className="onspot_box__select" onClick={resetTable}>
							<div className="onspot_select_def">
								<div className="form__field-wrapper__placeholder onspot_select_item">
								<img src={require("assets/i/smal_close.png").default} alt="" />
							</div>
							</div>
							

						</div>
					</>
					: <div className="onspot_box__adress">
						<div className="onspot_box_label">Адрес хинкальной:</div>
						<div className="row form__field-wrapper__address">
							<div className="form__field-wrapper__placeholder">
								<div className="form__field-wrapper__placeholder__ico">
									<img src={require("assets/i/cart/mark-dark.svg").default} alt="" />
								</div>
							</div>
							<div className="adress_fild__address">
								{point.address}
							</div>

						</div>
					</div>
			}


			{
				cart.orderTable && cart.orderTable.section !== 'fake' &&
				<div className="onspot_box__select">
					<div className="onspot_box_label">Стол</div>
					<div className="onspot_select_def" onClick={() => setSelect(prev => !prev)}>{cart.orderTable.numb}</div>
					{
						select && table &&
						<div className="onspot_select">
							{
								table.tables.map((val: any) => {
									const active = cn("onspot_select_item", {
										active: cart.orderTable.id === val.id
									});
									return <div key={val.id} className={active} onClick={() => handlTable({
										section: table.idsection,
										id: val.id,
										numb: val.number
									})}>{val.number}</div>
								})
							}
						</div>
					}
				</div>
			}

		</div>
	)
}
export default OnspotSelect