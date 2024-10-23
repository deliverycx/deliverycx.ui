import { OrganizationModel } from 'modules/OrganizationModule/Organization/domain/organization.model';
import { OrganizationStatusModel } from '../domain/organizationStatus.model';
import * as organizationStatusType from '../interfaces/organizationStatus.type';
import {
	IOrganization,
	IOrganizationAndStatuses,
} from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { OrganizationStatusServises } from '../domain/organizationStatus.servises';
import { InjectableDI } from 'application/helpers/dependencyInjection';
import { DTOMapper } from 'application/guards/aplication.guard';
import {
	organizationStatusDTO,
	organizationStatusMapper,
} from '../interfaces/organizationStatus.dto';
import {
	IDeliveryTypes,
	IOrganizationStatus,
	IPointStatus,
} from '../interfaces/organizationStatus.type';

@InjectableDI([OrganizationStatusServises, OrganizationStatusModel])
export class UseCaseOrganizationStatus {
	constructor(
		private readonly organizationStatusServises: OrganizationStatusServises,
		private readonly organizationStatusModel: OrganizationStatusModel,
	) { }

	@DTOMapper(organizationStatusMapper)
	getOrganizationStatus(
		status: organizationStatusType.IPointStatusRequest | undefined,
	) {
		if (status) {
			return this.organizationStatusServises.existingOrganizationStatus(status);
		}
		return null;
	}

	organizationStatusMetods(
		pointStatus: IPointStatus | null,
		point: IOrganization,
	) {

		const time = this.organizationStatusServises.timeWorkOrganizationEntiti(
			point.workTime,
			point.guid,
			pointStatus?.deliveryTime
		);

		const deliverytypes =
			pointStatus &&
			this.organizationStatusServises.deliveryTypesMetod(
				pointStatus.deliveryMetod,
			);

		return {
			...pointStatus,
			timeworkOrganization: time,
			deliveryTipe: deliverytypes,
		};
	}

	findDeliveryType(deliveryMetod: string, point: IOrganizationAndStatuses) {
		return point.deliveryTipe.find((value) => value.metod === deliveryMetod);
	}

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



	/*
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
