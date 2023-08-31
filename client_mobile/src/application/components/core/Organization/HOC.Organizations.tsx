import { adapterComponentUseCase } from "adapters/adapterComponents";
import { ROUTE_APP } from "application/contstans/route.const";
import { observer } from "mobx-react-lite"
import { cityModel } from "modules/CityModule/city.module";
import { Link} from "react-router-dom";
import { useOrganizationsViewModel } from "./Organization.viewModel";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import OrganizationMap from "./OrganizationMap/HOC.OrganizationMap";




const HOCOrganizations = () =>{
	

	const useCase = adapterComponentUseCase(useOrganizationsViewModel)
	const {city,organizations} = useCase.data
	
	

	return(
		<div className="welcome" >
		<div className="welcome__header transparent">
			<Link to={ROUTE_APP.MAIN}>назад</Link>
			<div>{city.cityname}</div>
		</div>	
		
		{
			!organizations && <>load</>
		}
		{
			organizations &&
			<OrganizationMap organizations={organizations} />
		}
		
		</div>
	)
}
export default observer(HOCOrganizations)