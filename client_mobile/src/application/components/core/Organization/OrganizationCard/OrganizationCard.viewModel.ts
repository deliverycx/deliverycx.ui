import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";
import { organizationModel, organizationStatusModel, useCaseOrganization, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";

export function useOrganizationCardViewModel() {
	const [cardModal,setCardModal] = useState(false)
	const {selectOrganization} = organizationModel
	const {deliveryTipe,organizationStatus,timeworkOrganization} = organizationStatusModel


	useEffect(()=>{
		if(selectOrganization){
			useCaseOrganizationStatus.statusOrganization()
			setCardModal(true)
			
		}
		
	},[selectOrganization])


	
	const handlerCloseCardModal = () =>{
		useCaseOrganization.selectOrganization(null)
		setCardModal(false)
	}

	const handlerSelectDeliveryTipe = (typeDeliv:IDeliveryTypes) =>{
		useCaseOrganizationStatus.selectDeliveryMetod(typeDeliv)
	}

	
	this.data({
		selectOrganization,
		timeworkOrganization,
		cardModal,
		deliveryTipe,
		organizationStatus
	});
	this.handlers({
		setCardModal,
		handlerCloseCardModal,
		handlerSelectDeliveryTipe
	});
	this.status({

	});
}