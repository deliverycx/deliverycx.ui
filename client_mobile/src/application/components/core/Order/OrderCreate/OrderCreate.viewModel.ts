import { orderCreateRepository } from "modules/OrderModule/data/orderCreate.repository";
import { orderCreateUseCase } from "modules/OrderModule/order.module";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_APP } from 'application/contstans/route.const';
import { appUseCase } from "modules/AppModule/app.module";

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
		}
	},[orderNumber])


	const orderCreate = async (hashorder:string) =>{
		setOrderLoad(true)
		const orderNumb = await orderCreateUseCase.orderCreate(hashorder)
		console.log(orderNumb);
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
							const { data } = await orderCreateRepository.repositoryGetOrder(hashNumb);
							new Promise((res, rej) => {

									if (data && data.orderNumber) {
											clearInterval(ref.current as any);
											res(data.orderNumber);
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
					}, 5000);
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

	});
	this.status({
		
	});
}