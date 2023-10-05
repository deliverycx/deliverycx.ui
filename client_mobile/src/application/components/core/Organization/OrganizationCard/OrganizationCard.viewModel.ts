import { appUseCase } from "modules/AppModule/app.module";
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";
import { organizationModel, organizationStatusModel, useCaseOrganization, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";

export function useOrganizationCardViewModel() {
	const [cardModal,setCardModal] = useState(false)
	const {selectOrganization} = organizationModel
	const {deliveryTipe,organizationStatus,timeworkOrganization} = organizationStatusModel
	//TODO ПОЛУЧАЕМ GUID ЧТОБЫ ЗАПРОС ДОБАВИТЬ ЕГО В ЗАПРОС, И ОТПРАВЛЯЕМ ЕГО В USECASE
	const organization = organizationModel.selectOrganization

	useEffect(()=>{
		if(selectOrganization){
			useCaseOrganizationStatus.statusOrganization()
			setCardModal(true)
			
		}
		
	},[selectOrganization])


	
	const handlerCloseCardModal = () =>{
		appUseCase.clearApp()
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
		organizationStatus,
		guid: organization?.guid
	});
	this.handlers({
		setCardModal,
		handlerCloseCardModal,
		handlerSelectDeliveryTipe
	});
	this.status({

	});
}