import { ICity } from "modules/CityModule/interfaces/city.type"
import { requestOrganizationApi } from "modules/OrganizationModule/Organization/data/organization.request"
import { organizationModel } from "modules/OrganizationModule/organization.module"
import { FC, useEffect } from "react"


const OrganizationSerch: FC<{ city: ICity }> = ({ city }) => {

	const handlerSerchPoint = async (value:string) =>{
		organizationModel.actionSerchOrganizations({
			data:value,
			cityid:city.id
		})
	}

	return (
		<div className="input__item input_icon input_icon_left">
			<div className="input__container">
				<img src={require('assets/images/icons/search.png')} alt="" />
				<input placeholder="Найти по адресу" onChange={e => handlerSerchPoint(e.target.value)} name="search" type="text" />
			</div>
		</div>
	)
}
export default OrganizationSerch