import React from 'react';

class TeamGear extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			header: props.header,
			title: props.title,
			text: props.text,
			taValue: ''
		};

		//-------------------------------------------------------
		// Bind methods to this object
		this.handleChangeTA = this.handleChangeTA.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.userID !== prevProps.userID) {
			this.fetchData(this.props.userID);
		}
	}


	//-------------------------------------------------------
	// Handle changes to this control
	handleChangeTA(event) {
		this.setState({ taValue: event.target.value });
	}

	//-------------------------------------------------------
	// Handle changes to this control
	handleSubmit() {
		//-------------------------------------------------------
		// Pass back controls state values
		this.props.handleSubmit(this.state);
	}

	findFlag(searchString, searchKey) {
		return (searchString !== undefined && searchString.indexOf(searchKey) > -1);
	}

	render() {
		const searchKey = `#${this.props.teamId}#`;
		const submit = this.findFlag(this.props.teamSubmit, searchKey);
		const success = this.findFlag(this.props.teamCorrect, searchKey);
		const fail = this.findFlag(this.props.teamFail, searchKey);
        
		let gearClass = 'card game_gear';
		let btnClass = 'btn btn-primary';
		if( success ) {
			gearClass = `${gearClass} text-white bg-success`;
			btnClass = `${btnClass} disabled`;
		}
		else if (fail) {
			gearClass = `${gearClass} text-white bg-danger`;
		}
		else if (submit) {
			gearClass = `${gearClass} text-white bg-warning`;
			btnClass = `${btnClass} disabled`;
		}
		else {
			gearClass = `${gearClass} w3-theme-d1`;
		}
		return (<div className={gearClass} >
			<div className="card-header">{this.state.header}</div>
			<div className="card-body">
				<h4 className="card-title">{this.state.title}</h4>
				<div className="card-text">
					<label>{this.state.text}</label>
					<textarea className="form-control" value={this.state.taValue} onChange={this.handleChangeTA}></textarea>
					<button type="button" className={btnClass}  disabled={success || submit} onClick={this.handleSubmit}>Submit</button>
				</div>
			</div>
		</div>);
	}
}
export default TeamGear;