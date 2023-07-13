import { useContext, useEffect } from "react";
import { ThemeContext } from "./App";
import { myTimer } from "./mob";
import { observer } from "mobx-react-lite";
import { myName } from "./mobtwo";
import { handlerTest } from "./handlertest";

const Dno = () =>{
	const timers = myTimer
	const names = myName

	const siti = () =>{
		const q = handlerTest.getSiti()
		console.log(q);
	}
	
	return(
		<><span>Seconds passed: {timers.secondsPassed}</span>
			<button onClick={() => siti()} >namee</button>
			<span>{names.name}</span>
		</>
	)
}
export default observer(Dno)