import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTest } from "servises/redux/slice/test.slice"
import Dno from "./Dno"
import { handlerTest } from "./handlertest"
import { observer } from "mobx-react-lite"
import { myTimer } from "./mob"

const Hoce = () =>{
	const timers = myTimer
	
	return(
		<>
		
		<Dno />
		<button onClick={() => timers.increaseTimer()}>qqqq</button>
		</>
	)
}
export default observer(Hoce)