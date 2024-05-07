import { appUseCase } from "modules/AppModule/app.module";
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";
import { organizationModel, organizationModule, organizationStatusModel, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";
import {
	requestOrganizationAdmin
} from "../../../../../modules/OrganizationModule/Organization/data/organization.request";
import { useQueryClient } from "react-query";
import { shopRepository } from "modules/ShopModule/data/shop.repository";
import { isDesctomMediaQuery } from "application/ResponseMedia";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";


export function useOrganizationCardViewModel() {
	const [cardModal, setCardModal] = useState(false)
	const [choosePoint, setChoosePoint] = useState<IOrganization | null>(null)
	const { selectOrganization } = organizationModel
	const { deliveryTipe, organizationStatus, timeworkOrganization } = organizationStatusModel
	const organization = organizationModel.selectOrganization
	const desc = isDesctomMediaQuery()
	const [point, setPoint] = useState<any>()

	/*
	useEffect(()=>{
		if(selectOrganization){
		
			setCardModal(true)
			
		}
		
	},[selectOrganization])
*/


	useEffect(() => {

		organizationModule.queryBus.handlerPointQuery((value: IOrganization) => {
			if (value) {
				setPoint(value)
				setCardModal(true)
			}
		})

	}, [])




	const handlerCloseCardModal = () => {
		//!desc && appUseCase.clearApp()
		setCardModal(false)
	}

	const handlerSelectDeliveryTipe = (typeDeliv: IDeliveryTypes) => {
		//useCaseOrganizationStatus.selectDeliveryMetod(typeDeliv)
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
		choosePoint,
		point,
		guid: organization?.guid
	});
	this.handlers({
		setCardModal,
		handlerCloseCardModal,
		setChoosePoint,
		handlerSelectDeliveryTipe
	});
	this.status({

	});
}