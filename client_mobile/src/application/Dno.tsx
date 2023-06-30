import { useContext, useEffect } from "react";
import { ThemeContext } from "./App";
import { myTimer } from "./mob";
import { observer } from "mobx-react-lite";
import { myName } from "./mobtwo";

const Dno = () =>{
	const timers = myTimer
	const names = myName

	
	
	return(
		<><span>Seconds passed: {timers.secondsPassed}</span>
			<button onClick={() => names.increaseTimer('peta')} >namee</button>
			<span>{names.name}</span>
		</>
	)
}
export default observer(Dno)