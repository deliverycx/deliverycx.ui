/* eslint-disable @typescript-eslint/no-var-requires */
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack"
import ReserveTable from "./ReserveTable"
import { useHistory } from "react-router-dom";
import { ROUTE_APP } from "application/contstans/route.const";
import ReserveTableSuccses from "./ReserveTableSuccses";
import { useState } from 'react';


const ReserveTableLayout = () => {
	const [succses,setSuccses] = useState<boolean>(false)
	const history = useHistory();


	const historyHandler = () => {
		history.push(ROUTE_APP.SHOP.SHOP_MAIN)
	}

	return (
		<div className="welcome">
			
			<HeaderBack onClickCb={historyHandler}>
				<span className="select-red">Забронировать</span> стол
			</HeaderBack>
			<div className="reserve">
				<div className="reserve-container">
					{
						succses 
						? <ReserveTableSuccses />
						: <ReserveTable sucses={setSuccses} />
					}
					
				</div>
			</div>
		</div >

	)
}
export default ReserveTableLayout
