/*
import React, { useEffect } from 'react';
import { FC } from 'react';
import "@pqina/flip/dist/flip.min.css";

type IProps = {
	count:number
}

const CountTik:FC<IProps> = ({count}) =>{
	const tickRef = React.createRef<any>();
	let tickInstance:any = null

	useEffect(() => {
    let Tick:any = null;
		
    (async () => {
			
      Tick = (await import('@pqina/flip')).default;
      tickInstance = Tick.DOM.create(tickRef.current, {
        value: count,
      });
    })();

		if (tickInstance){
			tickInstance.value = count
		};
    

    return () => {

      if (tickInstance) {
        Tick.DOM.destroy(tickRef.current);
      }
			
    };
  }, [count]);

	console.log(count);
	return(
		<div style={{ margin: "0" }}>
							<div className="tick">
				        <div ref={tickRef} data-repeat="true" aria-hidden="true">
				          <span data-view="flip">Tick</span>
				        </div>
				      </div>
				      </div>
	)
}
export default CountTik
*/


import React from "react";

//import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

type Iprop = {
	value:number
}

export default class Flip extends React.Component<Iprop> {

	_tickRef: any;
	_tickInstance: any;
  constructor(props:any) {
    super(props);
    this._tickRef = React.createRef();
  }

  async componentDidMount() {
		console.log(this.props.value);
		
    const Tick = (await import('@pqina/flip')).default;
    this._tickInstance = Tick.DOM.create(this._tickRef.current, {
      value: this.props.value
    });
  }

  componentDidUpdate() {
    if (!this._tickInstance) return;
    this._tickInstance.value = this.props.value
  }

  async componentWillUnmount() {
		const Tick = (await import('@pqina/flip')).default;
    if (!this._tickInstance) return;
    Tick.DOM.destroy(this._tickRef.current);
  }

  render() {
    return (
      <div ref={this._tickRef} className="tick">
        <div data-repeat="true" aria-hidden="true">
          <span data-view="flip">Tick</span>
        </div>
      </div>
    );
  }
}
/**/