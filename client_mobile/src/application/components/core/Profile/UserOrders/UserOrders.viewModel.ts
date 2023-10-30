import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { IUserOrders } from 'modules/Profile/interfaces/profile.type';
import { profileUseCase } from 'modules/Profile/profile.module';
import { useEffect } from 'react';
import { useState } from 'react';

export function useUserOrdersViewModel(this:any) {
	const [orderList,setOrderList] = useState<any | null>(null)
	const organization = organizationModel.selectOrganization
	
	useEffect(()=>{
		profileUseCase.userOrderList()
			.then(data =>{
				data && setOrderList(data)
			})
	},[])
	
	this.data({
		orderList,
		organization
	});
	this.handlers({
		
	});
	this.status({
		
	});
}