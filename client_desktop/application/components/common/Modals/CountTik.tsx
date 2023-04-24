
const CountTik = () =>{
	
}
export default CountTik
/*
import React from "react";

import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

export default class Flip extends React.Component {
	_tickRef: any;
	_tickInstance: any;
  constructor(props:any) {
    super(props);
    this._tickRef = React.createRef();
  }

  componentDidMount() {
    this._tickInstance = Tick.DOM.create(this._tickRef.current, {
      value: 0
    });
  }

  componentDidUpdate() {
    if (!this._tickInstance) return;
    this._tickInstance.value = 0
  }

  componentWillUnmount() {
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
*/