import CountTik from "application/components/common/Modals/CountTik";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Test: NextPage = () =>{
	const [count, setCount] = useState(5);

	/**/
	useEffect(()=>{
		setTimeout(()=>{
			setCount(count + 1)
		},5000)
	},[count])
	
	return(
		<></>
	)
}
export default Test