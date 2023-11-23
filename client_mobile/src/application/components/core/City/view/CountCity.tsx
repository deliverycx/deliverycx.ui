import { memo, useEffect, useMemo, useState } from "react";
import { requestCity } from "modules/CityModule/data/city.request";
import { ICity, ICityResponse } from "modules/CityModule/interfaces/city.type";

const CountCity = () => {
	const [coutCity, setCoutCity] = useState<{ cityCoutn: number, orgCount: number } | null>(null)
	/*
	const sumCity = useMemo(()=> data && cityModel.sumCityOrg(data),[data]) 
	console.log(sumCity);
	*/

	const sumCity = async () => {
		const { data } = await requestCity.getAll('')
		if (data && data.length) {
			const result = data.reduce((acc, value, arr, array) => {
				//console.log(acc,value.countOrg);
				acc.cityCoutn = array.length
				if(value.countOrg){
					acc.orgCount += value.countOrg
				} 

				return acc
			}, {
				cityCoutn: 0,
				orgCount: 0
			})

			setCoutCity(result)
		}

	}

	useEffect(() => {
		sumCity()
	}, [])


	function getNoun(number:any, one:any, two:any, five:any) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

	return (
		<>
			{
				coutCity &&
				<div className="select__title">
					{coutCity.orgCount} хинкаль{getNoun(coutCity.orgCount,"ных","ная","ных")} в  {coutCity.cityCoutn} городах
				</div>
			}


		</>
	)
}
export default memo(CountCity)