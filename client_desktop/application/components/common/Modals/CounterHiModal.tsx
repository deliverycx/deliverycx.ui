import { FC, useEffect, useState } from "react"
import Flip from "./CountTik";
import React from "react";
import "@pqina/flip/dist/flip.min.css";
import CountTik from "./CountTik";
import { RequestWebhook } from "servises/repository/Axios/Request";
import { format } from "date-fns";
import LoaderProduct from "../Loaders/loaderProduct";
import { adapterSelector } from 'servises/redux/selectors/selectors';
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin";

type IProps = {
	isModalOpen:boolean
	setIsModalOpen:any

}
const CounterHiModal:FC<IProps> = ({setIsModalOpen}) =>{
	const {phone,address,city,guid} = adapterSelector.useSelectors(selector => selector.point)
	const [count, setCount] = useState<any>('000000000000');
	const [tik, setTik] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(false);

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
			function setCounter(el: any, toNumber: any, delay: any, counter = (Number(numbFlip) - 100)) {
				
				timer = setTimeout(() => {
					counter++
					const zeroLength = 12;
					const c = parseInt(count)
					const newcount = String(c + counter).padStart(zeroLength, '0')
					console.log('nex',newcount);
					setCount(newcount)
					if (toNumber === counter) {
						setTik(true)

					}

				}, 1)
				/*
				for (let i = (toNumber - 100); i < toNumber; i++) {
					//clearTimeout(timer)

					timer = setTimeout(() => {
						counter++
						const zeroLength = 12;
						const c = parseInt(count)
						const newcount = String(c + counter).padStart(zeroLength, '0')
						console.log('nex',newcount);
						setCount(newcount)
						if (toNumber === counter) {
							setTik(true)

						}

					}, 1)
				}*/
			}
			async function organizationCoutn(guid: string) {

				const { data: countorg } = await RequestAdmin.getOraganizationCount(guid)
				if (countorg) {
					const today = format(new Date(), "yyy-LL-dd")
					if (today !== countorg.date) {
						console.log('дата не совпала', today, countorg.date);
						await RequestAdmin.setOraganizationCount({
							...countorg,
							coutn: (Number(countorg.coutn) + Number(numbFlip)),
							date: today
						})
						numbFlip = (Number(countorg.coutn) + Number(numbFlip))
					} else {
						numbFlip = Number(countorg.coutn)
					}



					const num1 = Number(numbFlip);
					const num2 = Number(numbFlip) - 10;
					const { delay1, delay2 } = getDelay(num1, num2, 2)
					setCounter('span1', num1, delay1)
					//setCounter('span2',num2, delay2)
				}
			}





			/**/
			if (numbFlip && guid) {
				await organizationCoutn(guid)
				/*
				timercoutn = setInterval(async () => {
					console.log('iiiiiiii');
					await organizationCoutn(point.guid)
				}, 100000)
				*/

			}
			

		})();

		return () => {
			clearTimeout(timer)
			clearInterval(timercoutn)
		}
	}, [])





	console.log("load",count);

	function dtime_nums(e: any) {
		// eslint-disable-next-line no-var
		var n = new Date;
		n.setDate(n.getDate() + e);
		return format(n, "yyy-LL-dd") //n.toLocaleDateString();
	}

	const getFlip = async () => {
		try {

			setLoad(true)
			const time = format(new Date(), "yyy-LL-dd")
			const oldtime = dtime_nums(-1)
			const { data } = await RequestWebhook.flip({
				time, oldtime, phone
			})
			//console.log('сьедено за сегодня', data);
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

	
	return(
		<div className="product_card flipmodal">
						<div className="product_card-container">
							<div className="close" onClick={() => setIsModalOpen(false)}>
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_329_8395)">
										<path d="M0 0L11.9991 12M12 0L0.00090279 12" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</g>
									<defs>
										<clipPath id="clip0_329_8395">
											<rect width="12" height="12" fill="white"/>
										</clipPath>
									</defs>
								</svg>
							</div>
							<section className="counter-tik_box">
								<h3 className="counter-tik_title">Съедено хинкали</h3>
								<h3 className="counter-tik_point">{city},{address}</h3>
								{
									load ? <LoaderProduct /> : <CountTik value={count} />
								}
								
								
							</section>
							

						</div>
					</div>
	)
}
export default CounterHiModal