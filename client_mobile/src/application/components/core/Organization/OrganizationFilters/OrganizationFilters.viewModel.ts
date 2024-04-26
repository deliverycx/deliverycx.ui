import { requestOrganizationAdmin } from "modules/OrganizationModule/Organization/data/organization.request"
import { OrganizationFilters } from "modules/OrganizationModule/Organization/interfaces/organization.type"
import { organizationModel, organizationModule } from "modules/OrganizationModule/organization.module"
import { useState, useEffect } from "react"
import { ICity } from 'modules/CityModule/interfaces/city.type';


export function useOrganizationFiltersViewModel(this:any,city:ICity) {
	const [isOpenedFilters, setIsOpenedFilters] = useState(false)
	const [filters, setFilters] = useState<OrganizationFilters[] | null>(null)
	const [changeFilter, setChangeFilter] = useState<string[] | null>(null)



	useEffect(() => {
		getFilters()
	}, [])

	useEffect(() => {
		changeFilter && organizationModule.handlerBus.handlerFilterOrganization(changeFilter, city.id)
	}, [changeFilter])

	const getFilters = async () => {
		try {
			const { data } = await requestOrganizationAdmin.getFilters()
			if (data && data.length !== 0) {
				setFilters(data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handlerFiler = async (id: string) => {
		if (changeFilter) {
			const index = changeFilter.indexOf(id)
			
			if (index === -1) {
				setChangeFilter((prev: any) => [...prev, id])
			} else {

				setChangeFilter((prev: any) => {
					return prev.filter((val: any) => val !== id)
				})

			}
		} else {
			setChangeFilter([id])
		}
	}

	const handlerResetFilter = () =>{
		organizationModule.handlerBus.handlerOrganizationsList(city.id)
		setIsOpenedFilters(false)
		setChangeFilter(null)
	}


	this.data({
		filters,
		isOpenedFilters,
		changeFilter
	});
	this.handlers({
		setIsOpenedFilters,
		handlerFiler,
		handlerResetFilter
	});
	this.status({
		
	});
}