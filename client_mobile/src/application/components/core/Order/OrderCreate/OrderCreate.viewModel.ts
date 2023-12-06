import { orderCreateRepository } from "modules/OrderModule/data/orderCreate.repository";
import { orderCreateUseCase } from "modules/OrderModule/order.module";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { appUseCase } from "modules/AppModule/app.module";
import ym from 'react-yandex-metrika';

export function useOrderCreateViewModel() {
	const {hash} = useParams()
	const ref = useRef<NodeJS.Timeout>();
	const navigate = useNavigate()

	const [orderNumber,setOrderNumber] = useState<null | number>(null)
	const [orderLoad, setOrderLoad] = useState(true);


	

	useEffect(() => {
		if ((location.pathname.split("/")[1] === "ordercreate") && hash) {
			orderCreate(hash)
		} else {
			navigate(ROUTE_APP.ORDER.ORDER_MAIN)
		}  
		() => {

			clearInterval(ref.current as any);
		};   
	}, [hash]);

	useEffect(()=>{
		if(orderNumber){
			appUseCase.crearOrder()
			//ym('reachGoal','ordercreate')
		}
	},[orderNumber])


	const orderCreate = async (hashorder:string) =>{
		setOrderLoad(true)
		const orderNumb = await orderCreateUseCase.orderCreate(hashorder)
		
		if(orderNumb){
			setOrderNumber(orderNumb)
			setOrderLoad(false)
		}else{
			presentOrder(hashorder)
		}
	}

	const presentOrder = async (hashNumb: string, tik = 0) => {
		try {
				let tik = 0;
					ref.current = setInterval(async () => {
							const result = await orderCreateRepository.repositoryGetOrder(hashNumb);
							console.log(result);
							new Promise((res, rej) => {

									if (result && result.orderNumber) {
											clearInterval(ref.current as any);
											res(result.orderNumber);
									} else {
											++tik;
											rej();
									}
							})
									.then((number) => {
											setOrderNumber(number as number);
											setOrderLoad(false);
									})
									.catch(() => {
											setOrderNumber(null);
											if (tik > 15) {
													clearInterval(ref.current as any);
													setOrderLoad(false);
											} else {
													setOrderLoad(true);
											}
									});
					}, 2000);
			} catch (error) {
					setOrderNumber(null);
					clearInterval(ref.current as any);
			}
	};

	

	this.data({
		orderNumber,
		orderLoad
	});
	this.handlers({
		navigate
	});
	this.status({
		
	});
}