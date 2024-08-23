/* eslint-disable prefer-const */
import { FC, useEffect, useState } from 'react';

import React from 'react';
import '@pqina/flip/dist/flip.min.css';

import { format } from 'date-fns';
import RequestWebhook from 'servises/Request/Request.Webhook';
import LoaderProduct from 'application/components/common/Loaders/loaderProduct';
import CounterTik from './CounterTik';
import {
	organizationModel,
	organizationModule,
} from 'modules/OrganizationModule/organization.module';
import { observer } from 'mobx-react-lite';
import RequestAdmins from 'servises/Request/Request.Admins';
import { IOrganization } from 'modules/OrganizationModule/Organization/interfaces/organization.type';
import { isDesctomMediaQuery } from 'application/ResponseMedia';

type IProps = {
	isModalOpen: boolean;
	setIsModalOpen: any;
};
const OrganizationCounterHi: FC<{ point: IOrganization }> = ({ point }) => {
	const [count, setCount] = useState<any>('00000000');
	const [tik, setTik] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(false);
	const desc = isDesctomMediaQuery();

	function dtime_nums(e: any) {
		// eslint-disable-next-line no-var
		var n = new Date();
		n.setDate(n.getDate() + e);
		return format(n, 'yyy-LL-dd'); //n.toLocaleDateString();
	}

	useEffect(() => {
		let timer: any;
		let timercoutn: any;
		(async () => {
			let numbFlip = await getFlip();

			function getDelay(num1: any, num2: any, delay: any) {
				const setDelay = (num1 * delay) / num2;
				return { delay2: setDelay, delay1: delay };
			}
			function setCounter(
				el: any,
				toNumber: any,
				delay: any,
				counter = Number(numbFlip) - 100,
			) {
				timer = setTimeout(() => {
					counter++;
					const zeroLength = 8;
					const c = parseInt(count);
					const newcount = String(counter).padStart(zeroLength, '0');
					console.log('nex', newcount);
					setCount(newcount);
					if (toNumber === counter) {
						setTik(true);
					}
				}, 1);
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
				const { data: countorg } =
					await RequestAdmins.getOraganizationCount(guid);

				if (countorg) {
					const today = format(new Date(), 'yyy-LL-dd');

					if (today !== countorg.date) {
						console.log('дата не совпала', today, countorg.date);
						await RequestAdmins.setOraganizationCount({
							...countorg,
							coutn: Number(countorg.coutn) + Number(numbFlip),
							date: today,
						});
						numbFlip = Number(countorg.coutn) + Number(numbFlip);
					} else {
						numbFlip = Number(countorg.coutn);
					}

					console.log(numbFlip);

					const num1 = Number(numbFlip);
					const num2 = Number(numbFlip) - 10;
					const { delay1, delay2 } = getDelay(num1, num2, 2);
					setCounter('span1', num1, delay1);
					//setCounter('span2',num2, delay2)
				}
			}

			/**/
			if (numbFlip && point) {
				await organizationCoutn(point.guid);
			}
		})();

		return () => {
			clearTimeout(timer);
			clearInterval(timercoutn);
		};
	}, [point]);

	const getFlip = async () => {
		try {
			setLoad(true);
			const time = format(new Date(), 'yyy-LL-dd');
			const oldtime = dtime_nums(-1);
			const { data } = await RequestWebhook.flip({
				time,
				oldtime,
				phone: point?.info.phone,
			});
			//console.log('сьедено за сегодня', data);
			if (data) {
				setLoad(false);
				const zeroLength = 7;
				const c = parseInt(count);
				const newcount = String(data).padStart(zeroLength, '0');
				setCount(newcount);
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="institute-counter">
			<h4>Съедено хинкали</h4>
			<div className="counter-wrapper">
				<div className="product_card flipmodal">
					<div className="product_card-container">
						<section className="counter-tik_box">
							{load ? <span>Загрузка...</span> : <CounterTik value={count} />}
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};
export default observer(OrganizationCounterHi);
