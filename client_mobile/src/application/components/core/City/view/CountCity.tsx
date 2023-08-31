import { memo, useEffect, useMemo, useState } from "react";
import { requestCity } from "modules/CityModule/data/city.request";
import { ICity, ICityResponse } from "modules/CityModule/interfaces/city.type";

const CountCity = () =>{
	const [coutCity,setCoutCity] = useState<{cityCoutn:number,orgCount:number} | null>(null)
	/*
	const sumCity = useMemo(()=> data && cityModel.sumCityOrg(data),[data]) 
	console.log(sumCity);
	*/

	const sumCity = async () =>{
		const {data} = await requestCity.getAll('')
		if(data && data.length){
			const result = data.reduce((acc,value,arr,array)=>{
				//console.log(acc,value.countOrg);
				acc.cityCoutn = array.length
				acc.orgCount += value.countOrg

				return acc
			},{
				cityCoutn:0,
				orgCount:0
			})
		
			setCoutCity(result)
		}
		
	}

	useEffect(()=>{
		sumCity()
	},[])

	

	return(
		<>
		{
			coutCity &&
			<>
				<span>городов - {coutCity.cityCoutn} </span>
				<span>точек -  {coutCity.orgCount}</span>
			</>
		}
		
	
		</>
	)
}
export default memo(CountCity)