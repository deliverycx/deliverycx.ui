import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { animated, useTransition } from "react-spring"

function TestModal() {
	const [showButton, setShowButton] = useState(false);
  const transitions = useTransition(showButton, {
		from: { opacity: 0, transform: "translateY(150%)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(150%)" }
});
	return (
		<>
		<button onClick={()=> setShowButton(true)}>wwwwwwww</button>
		
		{
			transitions((style, item) => (
				<animated.div style={style} className="modal">qweqwewqe
				<button onClick={()=> setShowButton(false)}>close</button>
				</animated.div>
			))
		}
		
		</>
	)
}
export default TestModal