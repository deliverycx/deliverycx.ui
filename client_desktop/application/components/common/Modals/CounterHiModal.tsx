import { FC, useEffect, useState } from "react"
import Flip from "./CountTik";
import React from "react";
import "@pqina/flip/dist/flip.min.css";
import CountTik from "./CountTik";

type IProps = {
	isModalOpen:boolean
	setIsModalOpen:any

}
const CounterHiModal:FC<IProps> = () =>{
	const [count, setCount] = useState<any>('000000000000');
	const [tik, setTik] = useState<boolean>(false);

	useEffect(()=>{
		let timer:any
		function getDelay(num1:any,num2:any,delay:any) {
			const setDelay =  (((num1)*delay) / (num2) );
			return {delay2: setDelay, delay1:delay}
		}
		function setCounter(el:any,toNumber:any,delay:any,counter=0) {
			for(let i = 0; i < toNumber; i++) {
				timer = setTimeout(() => {
					 counter++ 
					 const zeroLength = 12;
					const c = parseInt(count)
					const newcount = String(c + counter).padStart(zeroLength, '0')
					setCount(newcount)
					if(toNumber === counter){
						setTik(true)
						clearTimeout(timer)
					}
					console.log(timer);
				},1)
				
			}
			
		} 

		const num1 = 825;
		const num2 = 0;
		const {delay1,delay2} = getDelay(num1,num2,20)
		setCounter('span1',num1, delay1)
		setCounter('span2',num2, delay2)

		return () =>{
			clearTimeout(timer)
		}
	},[])


	/*	*/
	useEffect(()=>{
		let timer:any
		if(tik){
			setTimeout(()=>{
				const zeroLength = 12;
				const c = parseInt(count)
				const newcount = String(c + 1).padStart(zeroLength, '0')
				setCount(newcount)
			},5000)
		}
		return () =>{
			clearTimeout(timer)
		}
	},[tik,count])

	
	return(
		<div className="product_card">
						<div className="product_card-container">
							<div className="close" >
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
							<section>
								<h3 className="counter-tik_title">Съедено хинкали</h3>
								<CountTik value={count} />
							</section>
							

						</div>
					</div>
	)
}
export default CounterHiModal