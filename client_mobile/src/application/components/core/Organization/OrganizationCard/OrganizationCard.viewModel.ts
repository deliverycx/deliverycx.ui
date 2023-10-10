import { appUseCase } from "modules/AppModule/app.module";
import { IDeliveryTypes } from "modules/OrganizationModule/OrganizationStatuses/interfaces/organizationStatus.type";
import { organizationModel, organizationStatusModel, useCaseOrganization, useCaseOrganizationStatus } from "modules/OrganizationModule/organization.module";
import { useEffect, useState } from "react";
import {
	requestOrganizationAdmin
} from "../../../../../modules/OrganizationModule/Organization/data/organization.request";
import axios from "axios";
import {
	IRequisitiesOrganization
} from "../../../../../modules/OrganizationModule/Organization/interfaces/organization.type";

export function useOrganizationCardViewModel() {
	const [cardModal,setCardModal] = useState(false)
	const {selectOrganization} = organizationModel
	const {deliveryTipe,organizationStatus,timeworkOrganization} = organizationStatusModel
	const [goodPlaceId, setGoodPlaceId] = useState<string>('')
	const [data, setData] = useState<IRequisitiesOrganization>()
	const organization = organizationModel.selectOrganization

	useEffect(()=>{
		if(selectOrganization){
			useCaseOrganizationStatus.statusOrganization()
			setCardModal(true)

		}

	},[selectOrganization])

	useEffect(() => {
		const getRequisities = async () => {
			try {
				const res = await axios.get<IRequisitiesOrganization>(`http://localhost:5000/organization/recvisites?organizationId=${organizationModel.selectOrganization?.guid}`)
				console.log('RES REQ', res.data);
				setData(res.data)
			} catch (e) {
				console.log(e);
			}
		}

		getRequisities()
	}, [organizationModel.selectOrganization?.guid])

	useEffect(() => {
		const getGoodPlaceId = async () => {
			try {
				const { data } = await requestOrganizationAdmin.getByOrganizationGoodPlaceId(organizationModel.selectOrganization?.guid)
				setGoodPlaceId(data.goodplaceid)
			} catch (error) {
				console.log(error);
			}
		}

		getGoodPlaceId()
	}, [organizationModel.selectOrganization?.guid])

	const handlerCloseCardModal = () =>{
		appUseCase.clearApp()
		setCardModal(false)
	}

	const handlerSelectDeliveryTipe = (typeDeliv:IDeliveryTypes) =>{
		useCaseOrganizationStatus.selectDeliveryMetod(typeDeliv)
	}

	
	this.data({
		data,
		goodPlaceId,
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