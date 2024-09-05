import { IPoint } from "@types";
import { ROUTE_APP } from "application/contstans/route.const";
import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import { adapterSelector } from "servises/redux/selectors/selectors";

const AdressInfo: FC = () => {
	const point = adapterSelector.useSelectors<IPoint>(selector => selector.point)
	const history = useHistory();
	return (
		<div className="adress_info">
			<a href="хинкалыч.рф" className="adress_info__city" >{point.city}</a>
			<a href="хинкалыч.рф" className="adress_info__street" >{point.address}</a>
			<a href={"tel:" + point.phone} className="adress_info__phone">{point.phone}</a>
		</div>
	)
}

export default memo(AdressInfo);