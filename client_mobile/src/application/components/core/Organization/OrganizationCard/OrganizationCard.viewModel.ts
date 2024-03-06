import { appUseCase } from "modules/AppModule/app.module";
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";
import { organizationModel, organizationStatusModel, useCaseOrganization, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";
import {
	requestOrganizationAdmin
} from "../../../../../modules/OrganizationModule/Organization/data/organization.request";
import { useQueryClient } from "react-query";
import { shopRepository } from "modules/ShopModule/data/shop.repository";

export function useOrganizationCardViewModel() {
	const [cardModal,setCardModal] = useState(false)
	const {selectOrganization} = organizationModel
	const {deliveryTipe,organizationStatus,timeworkOrganization} = organizationStatusModel
	const organization = organizationModel.selectOrganization

	useEffect(()=>{
		if(selectOrganization){
		
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

	/*
	const queryClient = useQueryClient();
	queryClient.prefetchQuery(
		'shop',
		({ queryKey }) => shopRepository.reposityNomenclature(
				selectOrganization &&
				(!selectOrganization.redirect || selectOrganization.redirect.redirectON === false) &&
				!selectOrganization.delivery
					? selectOrganization.guid as string : '')
			)
			*/
	
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