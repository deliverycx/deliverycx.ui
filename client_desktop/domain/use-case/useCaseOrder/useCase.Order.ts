/* eslint-disable prefer-const */
import { ROUTE_APP } from "application/contstans/route.const";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import { accessOrder, fetchDeleteCart } from "servises/redux/slice/cartSlice";
import RequestOrder from "servises/repository/Axios/Request/Request.Order";

export function useOrder(this: any) {
    const [orderNumber, setOrderNumber] = useState<null | number>(null);
    const [orderLoad, setOrderLoad] = useState(true);
    const router = useRouter()
    const dispatch = useDispatch();
    const url = location.pathname.split("/")[2];
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
        if (router.isReady && Object.keys(router.query).length) {
            presentOrder(router.query.slug as string);
        }
        () => {
            clearInterval(ref.current as any);
        };
    }, [router.isReady]);

    const handleBacktoShop = () => {
        dispatch(fetchDeleteCart());
        dispatch(accessOrder());
				router.push(ROUTE_APP.MENU)
    };

		const handleBacktoCart = () =>{
			router.push(ROUTE_APP.MENU)
		}

    this.data({
        orderNumber
    });
    this.handlers({
        handleBacktoShop,
				handleBacktoCart
    });
    this.status({
        orderLoad
    });
}
