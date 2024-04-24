import Footer from "application/components/common/Footer/Footer"
import LoaderProduct from "application/components/common/Loaders/loaderProduct"
import CountTik from "application/components/common/Modals/CountTik"
import CounterHiModal from "application/components/common/Modals/CounterHiModal"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { adapterSelector } from "servises/redux/selectors/selectors"
import { RequestWebhook } from "servises/repository/Axios/Request"
import RequestLocation from "servises/repository/Axios/Request/Request.Location"
import { RequestAdmin } from "servises/repository/Axios/RequestAdmin"

const CouterPage = () =>{

	const {phone,address,city,guid} = adapterSelector.useSelectors(selector => selector.point)
	const [count, setCount] = useState<any>('0000000');
	const [tik, setTik] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(false);
	const [org, setOrg] = useState<any>(null);

	const router = useRouter()
	const pageid = router.query.id as string

	//console.log(pageid);
	/**/
	useEffect(() => {
		let timer: any
		let timercoutn: any
		org && (async () => {
			let numbFlip = await getFlip()


			function getDelay(num1: any, num2: any, delay: any) {
				const setDelay = (((num1) * delay) / (num2));
				return { delay2: setDelay, delay1: delay }
			}
			function setCounter(el: any, toNumber: any, delay: any, counter = (Number(numbFlip) -1)) {
				
				timer = setTimeout(() => {
					counter++
					const zeroLength = 8;
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
			async function organizationCoutn(id: string) {
				const coutToday = await getFlipToday()
				//const { data: countorg } = await RequestAdmin.getOraganizationCount(id)
				if (coutToday) {
					/*
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
						const coutToday = await getFlipToday()
						console.log('today',coutToday);
						numbFlip = Number(countorg.coutn) + Number(coutToday)
					}
					*/

					
					numbFlip = Number(coutToday)

					const num1 = Number(numbFlip);
					const num2 = Number(numbFlip) ;
					const { delay1, delay2 } = getDelay(num1, num2, 2)
					setCounter('span1', num1, delay1)
					//setCounter('span2',num2, delay2)
				}
			}





			/**/
			if (numbFlip && org) {
				await organizationCoutn(org.guid)
				/**/
				timercoutn = setInterval(async () => {
					console.log('iiiiiiii');
					await organizationCoutn(org.guid)
				},20000)
				

			}
			

		})();
		//console.log(org);
		return () => {
			clearTimeout(timer)
			clearInterval(timercoutn)
		}
	}, [org,pageid])


	const getOrg = async (id:string) =>{
		try {
			const {data} = await RequestLocation.geBuOrg(id)
			setOrg(data)
		} catch (error) {
			
		}
	}

	useEffect(()=>{
		
		pageid && getOrg(pageid)
	},[pageid])





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
				time, oldtime, phone:org.phone
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

	const getFlipToday = async () => {
		try {

			
			const time = dtime_nums(1) //format(new Date(), "yyy-LL-dd")
			const oldtime = "2015-01-01"
			const { data } = await RequestWebhook.flip({
				time, oldtime, phone:org.phone,	pages:true
			})
			//console.log('сьедено за сегодня', data);
			
			return data
		} catch (error) {
			console.log(error);
		}

	}



	return(
		<>
    <section className="checkout_page telikpage">
    <div className="telikcount">
		  
      <div className="cart_page-container">
			<section className="counter-tik_box">
								<h3 className="counter-tik_title">Съедено</h3>
								
								{
									load ? <LoaderProduct /> : <CountTik value={count} />
								}
								<h3 className="counter-tik_title">хинкали</h3>
								
							</section>
      </div>
      </div>
     </section>
    <Footer />
    </>
	)
}
export default CouterPage