import { InjectableDI } from 'application/helpers/dependencyInjection';
import {
	IOrganization,
	IOrganizationAndStatuses,
} from '../../interfaces/types/organization.type';
import {
	IOrganizationStatus,
	IOrganizationStatusMetods,
} from '../../interfaces/types/organizationStatus.type';
import { OrganizationStatusServises } from '../services/organizationStatus.servises';
import { OrganizationStatusModel } from '../store/organizationStatus.model';

@InjectableDI([OrganizationStatusServises, OrganizationStatusModel])
export class UseCaseOrganizationStatus {
	constructor(
		private readonly organizationStatusServises: OrganizationStatusServises,
	) { }

	organizationStatusExist(organizationStatus: IOrganizationStatus) {
		if (organizationStatus) {
			this.organizationStatusServises.existingOrganizationStatus(
				organizationStatus,
			);
		}
		return null;
	}

	organizationStatusMetods(
		pointStatus: IOrganizationStatus,
		point: IOrganization,
	): IOrganizationStatusMetods {
		const time = this.organizationStatusServises.timeWorkOrganizationEntiti(
			point.workTime,
			point.guid,
		);

		const deliverytypes = this.organizationStatusServises.deliveryTypesMetod(
			pointStatus.deliveryMetod,
		);

		return {
			...pointStatus,
			timeworkOrganization: time,
			deliveryTipesMetods: deliverytypes,
		};
	}

	findDeliveryType(deliveryMetod: string, point: IOrganizationAndStatuses) {
		return point.deliveryTipe.find((value) => value.metod === deliveryMetod);
	}

	/*
	changeActiveDeliveryTypes(
		organizationStatus: IOrganizationStatus,
		selectType: IDeliveryTypes,
	) {
		return this.organizationStatusServises.changesDeliveryType(
			organizationStatus.deliveryTipe,
			organizationStatus.timeworkOrganization,
			selectType,
		);
	}
	

	selectActiveDeliveryType(
		organizationStatus: IOrganizationStatus,
		selectType: IDeliveryTypes,
	) {
		const result = this.changeActiveDeliveryTypes(
			organizationStatus,
			selectType,
		);
		console.log(result);
		const findType = result.find((item) => item.active === true);
		return findType;
	}
	*/

	/*
	changeActiveDeliveryTypes = 


	targetOrganization(guid: string, deliveryMetod: any) {
		const point = this.organizationModel.actionSelectOrganization(guid)
		if (point) {
			point.subscribe((data: any) => {
				this.findDeliveryType(deliveryMetod,data)
			})
		}
		return point

	}


	async statusPointsList(point:IOrganization){
	
		const observableStatus = await this.organizationStatusModel.getOrganizationStatusAxios(point.guid)
		if(observableStatus){
				const time = this.pointTimeWork(point)
				const deliverytypes = this.organizationStatusModel.deliveryTypesMetod(observableStatus.deliveryMetod)
			return {
				deliveryTipe:this.organizationStatusModel.changesDeliveryType(deliverytypes,time),
				organizationStatus:observableStatus.organizationStatus,
				timeworkOrganization:time,
				paymentMetod:observableStatus.paymentMetod
			}
		}
	}

	pointTimeWork(point:IOrganization){
		return this.organizationStatusModel.timeWorkOrganizationEntiti(point.workTime,point.guid)
	}

	*/
}
