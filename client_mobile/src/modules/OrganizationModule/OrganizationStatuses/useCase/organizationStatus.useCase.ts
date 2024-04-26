import { OrganizationModel } from "modules/OrganizationModule/Organization/domain/organization.model";
import { OrganizationStatusModel } from "../domain/organizationStatus.model";
import * as organizationStatusType from "../interfaces/organizationStatus.type";
import { IOrganization } from "modules/OrganizationModule/Organization/interfaces/organization.type";
import { OrganizationStatusServises } from "../domain/organizationStatus.servises";
import { InjectableDI } from "application/helpers/dependencyInjection";
import { DTOMapper } from "application/guards/aplication.guard";
import { organizationStatusDTO, organizationStatusMapper } from "../interfaces/organizationStatus.dto";
import { IPointStatus } from "../interfaces/organizationStatus.type";


@InjectableDI([OrganizationStatusServises])
export class UseCaseOrganizationStatus {
	constructor(
		private readonly organizationStatusServises:OrganizationStatusServises
	) { }

	@DTOMapper(organizationStatusMapper)
	getOrganizationStatus(status:organizationStatusType.IPointStatusRequest | undefined){
		if(status){
			return this.organizationStatusServises.existingOrganizationStatus(status)
		}
		return null
	}

	organizationStatusMetods(pointStatus:IPointStatus | null,point:IOrganization){
		const time = this.organizationStatusServises.timeWorkOrganizationEntiti(point.workTime,point.guid)
		
		const deliverytypes = pointStatus && this.organizationStatusServises.deliveryTypesMetod(pointStatus.deliveryMetod)

		return {
			...pointStatus,
			timeworkOrganization:time,
			deliveryTipe:deliverytypes
		}
	
	}

	/*

	selectDeliveryMetod(deliveryTipe: IDeliveryTypes | null) {
		this.organizationStatusModel.actionSelectDeliveryTipe(deliveryTipe)
	}

	statusOrganization() {
		if (this.organizationModel.selectOrganization) {
			return this.organizationStatusModel.actionOrganizationStatus(this.organizationModel.selectOrganization)
		}
	}

	checkDeliveryMetod() {
		if (this.organizationStatusModel.selectDeliveryTipe) {
			this.organizationStatusModel.actionCheckDeliveryTipe(this.organizationStatusModel.selectDeliveryTipe)
		}

	}

	findDeliveryType(deliveryMetod: string,point:IOrganization) {
		
		const pointstatus = this.organizationStatusModel.actionOrganizationStatus(point)
		pointstatus && pointstatus.subscribe(data => {
			const delivery = this.organizationStatusModel.deliveryTypesMetod(data.deliveryMetod)
			delivery.forEach((metod) => {
				metod.metod === deliveryMetod && this.organizationStatusModel.actionSelectDeliveryTipe(metod)
			})
		})
	}


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