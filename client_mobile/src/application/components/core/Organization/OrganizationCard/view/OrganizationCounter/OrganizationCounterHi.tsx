/* eslint-disable prefer-const */
import { FC, useEffect, useState } from "react"

import React from "react";
import "@pqina/flip/dist/flip.min.css";


import { format } from "date-fns";
import RequestWebhook from "servises/Request/Request.Webhook";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import CounterTik from "./CounterTik";
import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { observer } from 'mobx-react-lite';
import RequestAdmins from "servises/Request/Request.Admins";


type IProps = {
	isModalOpen: boolean
	setIsModalOpen: any

}
const OrganizationCounterHi = () => {
	const point = organizationModel.selectOrganization
	const [count, setCount] = useState<any>('000000000000');
	const [tik, setTik] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(false);

	function dtime_nums(e: any) {
		// eslint-disable-next-line no-var
		var n = new Date;
		n.setDate(n.getDate() + e);
		return format(n, "yyy-LL-dd") //n.toLocaleDateString();
	}


	/**/
	useEffect(() => {
		let timer: any
		let timercoutn: any
		(async () => {
			let numbFlip = await getFlip()


			function getDelay(num1: any, num2: any, delay: any) {
				const setDelay = (((num1) * delay) / (num2));
				return { delay2: setDelay, delay1: delay }
			}
			function setCounter(el: any, toNumber: any, delay: any, counter = (Number(numbFlip) - 1000)) {
				//console.log('for',toNumber);
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
			async function organizationCoutn(guid:string) {
				let finalNumber = 0
				const { data: countorg } =  await RequestAdmins.getOraganizationCount(guid)
				if (countorg) {
					const today = format(new Date(), "yyy-LL-dd")
					if (today !== countorg.date) {
						console.log('дата не совпала', today, countorg.date);
						await RequestAdmins.setOraganizationCount({
							...countorg,
							coutn: (Number(countorg.coutn) + Number(numbFlip)),
							date: today
						})
						finalNumber = (Number(countorg.coutn) + Number(numbFlip))
					} else {
						finalNumber = Number(countorg.coutn)
					}

					const num1 = Number(numbFlip);
					const num2 = Number(numbFlip) - 10;
					const { delay1, delay2 } = getDelay(num1, num2, 2)
					setCounter('span1', num1, delay1)
					//setCounter('span2',num2, delay2)
				}
			}






			if (numbFlip && point) {
				await organizationCoutn(point.guid)
				timercoutn = setInterval(async () => {
					console.log('iiiiiiii');
					await organizationCoutn(point.guid)
				}, 100000)


			}

		})();






		return () => {
			clearTimeout(timer)
			clearInterval(timercoutn)
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


	//console.log("load", count);
	//console.log('phoneee',pointe);

	const getFlip = async () => {
		try {

			setLoad(true)
			const time = format(new Date(), "yyy-LL-dd")
			const oldtime = dtime_nums(-1)
			const { data } = await RequestWebhook.flip({
				time, oldtime, phone:point?.info.phone
			})
			console.log('сьедено за сегодня', data);
			if (data) {
				setLoad(false)
				const zeroLength = 12;
				const c = parseInt(count)
				const newcount = String(data).padStart(zeroLength, '0')
				setCount(newcount)
			}
			return data
		} catch (error) {
			console.log(error);
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