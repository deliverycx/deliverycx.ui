import { appUseCase } from "modules/AppModule/app.module";
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";
import { organizationModel, organizationModule, organizationStatusModel, organizationStatusModule } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";
import { isDesctomMediaQuery } from "application/ResponseMedia";
import { IOrganization, IOrganizationAndStatuses } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { useNavigate } from "react-router-dom";


export function useOrganizationCardViewModel() {
	const [cardModal, setCardModal] = useState(false)
	const [choosePoint, setChoosePoint] = useState<IOrganization | null>(null)
	const { selectOrganization,actionSelectOrganization } = organizationModel
	const { deliveryTipe, organizationStatus, timeworkOrganization } = organizationStatusModel
	const organization = organizationModel.selectOrganization
	const desc = isDesctomMediaQuery()
	const [point, setPoint] = useState<any>()
	const navigate = useNavigate()


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

	const handlerSelectDeliveryTipe = (typeDeliv: string,organization:IOrganizationAndStatuses) => {
		const resultType = organizationStatusModule.useCaseOrganizationStatus.findDeliveryType(typeDeliv,organization)
		resultType && organizationStatusModel.actionSelectDeliveryTipe(resultType)
		handlerSelectMenu(organization)
	}

	const handlerSelectMenu = (organization:IOrganizationAndStatuses) => {
		
		organizationModel.actionSelectOrganization(organization)
		navigate(`/shop?address=${organization.info.city},${organization.info.address}`)
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
		handlerSelectDeliveryTipe,
		handlerSelectMenu
	});
	this.status({

	});
}