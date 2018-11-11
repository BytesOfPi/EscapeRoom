import React, { Component } from 'react';

class TimeSample extends Component {
	constructor(props){
		super(props);

		this.state = { time: Date.now() };
		this.timedEvent = this.timedEvent.bind(this);
	}
	render(){
		return(
			<div className="row">
				<div className="col-lg-2">{ this.state.time }</div>
			</div>
		);
	}

	timedEvent() {
		console.log('TimeSample Run...');
		this.setState({ time: Date.now() });
	}

	componentDidMount() {
		console.log('TimeSample Mounted...');
		this.interval = setInterval(() => this.timedEvent(), 5000);
	}

	componentWillUnmount() {
		console.log('TimeSample clear...');
		clearInterval(this.interval);
	}
}

export default TimeSample;