import { makeObservable, observable, action } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { InjectableDI } from 'application/helpers/dependencyInjection';
import { IOrganization, pointSerch } from '../../interfaces/types/organization.type';

interface IRequisites {
	ogrn: string;
	inn: string;
	name: string;
}

@InjectableDI()
export class OrganizationModel {
	organizationList: Array<IOrganization> | null = [];
	selectOrganization: IOrganization | null = null;
	selectRequisites: IRequisites | null = null;

	constructor() {
		makeObservable(this, {
			organizationList: observable,
			selectOrganization: observable,
			selectRequisites: observable,
			actionSetOrganizationAll: action,
			actionResetOrganizationAll: action,
			actionSelectOrganization: action,
		});
		makePersistable(this, {
			name: 'PointStore',
			properties: ['selectOrganization'],
			storage: window.localStorage,
		});
	}

	actionSetOrganizationAll(list: IOrganization[]) {
		this.organizationList = list;
	}

	actionSelectOrganization(organization: IOrganization | null) {
		this.selectOrganization = organization;
	}

	actionSerchOrganizations(valueSerch: pointSerch) {
		console.log('serch');
	}

	actionResetOrganizationAll() {
		this.organizationList = null;
		this.selectRequisites = null;
	}
}
