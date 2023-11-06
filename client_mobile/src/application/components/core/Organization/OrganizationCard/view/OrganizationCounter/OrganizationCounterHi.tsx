import { FC, useEffect, useState } from "react"

import React from "react";
import "@pqina/flip/dist/flip.min.css";


import { format } from "date-fns";
import RequestWebhook from "servises/Request/Request.Webhook";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import CounterTik from "./CounterTik";
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { observer } from 'mobx-react-lite';


type IProps = {
	isModalOpen: boolean
	setIsModalOpen: any

}
const OrganizationCounterHi = () => {
	const point = organizationModel.selectOrganization
	const [count, setCount] = useState<any>('000000000000');
	const [tik, setTik] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(false);

	/**/
	useEffect(() => {
		let timer: any
		(async () => {
			const numbFlip = await getFlip()

			function getDelay(num1: any, num2: any, delay: any) {
				const setDelay = (((num1) * delay) / (num2));
				return { delay2: setDelay, delay1: delay }
			}
			function setCounter(el: any, toNumber: any, delay: any, counter = (Number(numbFlip) - 1000)) {
				console.log('for', toNumber);
				for (let i = (toNumber - 1000); i < toNumber; i++) {
					//clearTimeout(timer)

					timer = setTimeout(() => {
						counter++
						const zeroLength = 12;
						const c = parseInt(count)
						const newcount = String(c + counter).padStart(zeroLength, '0')
						setCount(newcount)
						if (toNumber === counter) {
							setTik(true)

						}

					}, 1)



				}/**/




			}

			if (numbFlip) {
				const num1 = Number(numbFlip);
				const num2 = Number(numbFlip) - 10;
				const { delay1, delay2 } = getDelay(num1, num2, 2)
				setCounter('span1', num1, delay1)
				//setCounter('span2',num2, delay2)
			}

		})();






		return () => {
			clearTimeout(timer)
		}
	}, [])




	/*	*/
	useEffect(() => {
		/*
		let timer:any
		setTimeout(()=>{
			const zeroLength = 12;
			const c = parseInt(count)
			const newcount = String(c + 1).padStart(zeroLength, '0')
			setCount(newcount)
		},5000)
		return () =>{
			clearTimeout(timer)
		}
		*/


	}, [load])


	console.log("load", count);

	const getFlip = async () => {
		try {
			setLoad(true)
			const time = format(new Date(), "yyy-LL-dd")
			const { data } = await RequestWebhook.flip({
				time, phone:point?.info.phone
			})
			if (data) {
				setLoad(false)
				const zeroLength = 12;
				const c = parseInt(count)
				const newcount = String(data).padStart(zeroLength, '0')
				setCount(newcount)
			}
			return data
		} catch (error) {
			console.log(setLoad(true));
		}
		
	}


	return (
		<div className="product_card flipmodal">
			<div className="product_card-container">
				
				<section className="counter-tik_box">
				
					{
						load ? <span>Загрузка...</span> : <CounterTik value={count} />
					}


				</section>


			</div>
		</div>
	)
}
export default observer(OrganizationCounterHi) 