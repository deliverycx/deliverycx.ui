import { useState } from 'react';
import { RequestCart } from 'servises/repository/Axios/Request';
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrderTable } from 'servises/redux/slice/cartSlice';
import cn from "classnames";

const OnspotSelect = () =>{
	const point = adapterSelector.useSelectors(selector => selector.point)
	const cart = adapterSelector.useSelectors(selector => selector.cart)
	const [select,setSelect] = useState(false)
	const [table,setTables] = useState<any>()
	const dispatch = useDispatch()

	useEffect(()=>{
		getAllTable()
	},[])

	const getAllTable = async () =>{
		try {
			const {data} = await RequestCart.orgTables(point.guid)
			if(data && data.length !== 0){
				const t = data[0]
				setTables(t)

				if(!cart.orderTable){
					dispatch(setOrderTable({
						section:t.idsection,
						id:t.tables[0].id,
						numb:t.tables[0].number
					}))
				}
				
			}else{
				dispatch(setOrderTable(null))
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handlTable = (table:any) =>{
		dispatch(setOrderTable(table))
		setSelect(false)
	}



	return (
		<div className="onspot_box">
			<div className="onspot_box__adress">
				<div className="onspot_box_label">хинкальная адрес</div>
				<div className="onspot_select_def">турецкая 25</div>
			</div>
			{
				cart.orderTable &&
				<div className="onspot_box__select">
					<div className="onspot_box_label">Стол</div>
					<div className="onspot_select_def" onClick={()=> setSelect(prev => !prev)}>{cart.orderTable.numb}</div>
					{
						select && table &&
						<div className="onspot_select">
							{
								table.tables.map((val:any)=>{
									const active = cn("onspot_select_item", {
										active: cart.orderTable.id === val.id
									}); 
									return <div key={val.id} className={active} onClick={()=> handlTable({
										section:table.idsection,
										id:val.id,
										numb:val.number
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