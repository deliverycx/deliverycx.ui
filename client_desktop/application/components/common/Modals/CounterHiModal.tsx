import { FC, useEffect, useState } from "react"
import Flip from "./CountTik";
import React from "react";
import "@pqina/flip/dist/flip.min.css";

type IProps = {
	isModalOpen:boolean
	setIsModalOpen:any
}
const CounterHiModal:FC<IProps> = () =>{
	const [count, setCount] = useState(5);
	
	/*	*/
	const tickRef = React.createRef<any>();
	let tickInstance:any = null

	useEffect(() => {
    let Tick:any = null;
		
    (async () => {
      Tick = (await import('@pqina/flip')).default;
      tickInstance = Tick.DOM.create(tickRef.current, {
        value: 13,
      });
    })();

    return () => {
      if (tickInstance) {
        Tick.DOM.destroy(tickRef.current);
      }
    };
  }, [count]);


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
							<div style={{ margin: "3em" }}>
							<div className="tick">
				        <div ref={tickRef} data-repeat="true" aria-hidden="true">
				          <span data-view="flip">Tick</span>
				        </div>
				      </div>
				      </div>
							<button onClick={e => setCount(count + 1)}>Increase</button>
						</div>
					</div>
	)
}
export default CounterHiModal