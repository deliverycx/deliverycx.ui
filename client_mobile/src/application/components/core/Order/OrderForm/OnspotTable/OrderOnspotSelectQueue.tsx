import { FC } from "react"
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';


const OrderOnspotSelectQueue:FC<{organization:IOrganization}> = ({organization}) =>{
	return(
		<div className="d-flex flex-center gap-12">
			<div  className="input__item input_icon input_icon_left input_icon_right flex-big">
				<label htmlFor="adresses-institut">Адрес заведения</label>
				<div className="input__container">
					<img src={require("assets/images/icons/location_gray_999.png")} alt="" />
					<input readOnly  value={organization.info.address} name="adresses-institut" type="" />
					
				</div>
			</div>


		</div>
	)
}
export default OrderOnspotSelectQueue