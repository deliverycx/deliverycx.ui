import { organizationModel, organizationStatusModel, useCaseOrganization } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";

export function useOrganizationCardViewModel() {
	const [cardModal,setCardModal] = useState(false)
	const {selectOrganization,timeworkOrganization} = organizationModel
	const {deliveryTipe} = organizationStatusModel

	useEffect(()=>{
		if(selectOrganization){
			setCardModal(true)
			//useCaseOrganization.organizationAll()
		}
		
	},[selectOrganization])


	const handlerCloseCardModal = () =>{
		useCaseOrganization.selectOrganization(null)
		setCardModal(false)
	}

	
	this.data({
		selectOrganization,
		timeworkOrganization,
		cardModal,
		deliveryTipe
	});
	this.handlers({
		setCardModal,
		handlerCloseCardModal
	});
	this.status({

	});
}