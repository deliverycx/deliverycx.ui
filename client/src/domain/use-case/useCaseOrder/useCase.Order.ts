/* eslint-disable prefer-const */
import { ROUTE_APP } from "application/contstans/route.const";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { accessOrder, fetchDeleteCart } from "servises/redux/slice/cartSlice";
import RequestOrder from "servises/repository/Axios/Request/Request.Order";

export function useOrder() {
    const [orderNumber, setOrderNumber] = useState<null | number>(null);
    const [orderLoad, setOrderLoad] = useState(true);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const hash = location.pathname.split("/")[2];
    const ref = useRef<NodeJS.Timeout>();

    const presentOrder = async (hashNumb: string, tik = 0) => {
			try {
					let tik = 0;
						ref.current = setInterval(async () => {
								const { data } = await RequestOrder.getOrder(hashNumb);
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



    useEffect(() => {
        if ((location.pathname.split("/")[1] === "success" || location.pathname.split("/")[1] === "dualpayment") && hash) {
            presentOrder(hash);
        } else {
            history.push(ROUTE_APP.SHOP.SHOP_MAIN);
        }
        () => {
            clearInterval(ref.current as any);
        };      
    }, [hash]);

    const handleBacktoShop = () => {
        dispatch(fetchDeleteCart());
        dispatch(accessOrder());
        history.push(ROUTE_APP.SHOP.SHOP_MAIN);
    };

    this.data({
        orderNumber,
				hash
    });
    this.handlers({
        handleBacktoShop
    });
    this.status({
        orderLoad
    });
}

export function useOrderDualPayment({orderNumber,hash}:any) {
	const history = useHistory();
	const [orderInfo,setOrderInfo] = useState<any>()

	const getAdminOrder = async () =>{
		try {
			const {data} = await RequestOrder.dualPayment(hash)
			setOrderInfo(data)
		} catch (error) {
			console.log(error);
		}
	}

	

	useEffect(()=>{
		orderNumber && getAdminOrder()
	},[orderNumber,hash])

	const handlerBackToOrder = () =>{
		history.push(ROUTE_APP.ORDER + '/' + hash)	
	}

	const handlerPayBar = async () =>{
		try {
			const {data} = await RequestOrder.dualPaymentCreate({
				hash,
				localhost:`${document.location.protocol}//${document.location.host}`
			})
			if (data.redirectUrl) {
        if (typeof data.redirectUrl === 'string') {
          window.location.href = data.redirectUrl;
        }
        
      }
		} catch (error) {
			console.log(error);
		}
		//window.location.href = "https://paymaster.ru/cpay/c3b229b6f1bc45fab75eed03f0041c3f"
	}

	this.data({
		orderInfo
	});
	this.handlers({
		handlerBackToOrder,
		handlerPayBar
	});
	this.status({
		
	});
}


