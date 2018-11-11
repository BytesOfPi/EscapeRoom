import React from 'react';

class AttemptGear extends React.Component {
	constructor(props) {
		super(props);
		const { id, teamName, playerName, guess, qHeader, qBody} = props;
		this.state = { id, teamName, playerName, guess, qHeader, qBody};

		//-------------------------------------------------------
		// Bind methods to this object
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	//---------------------------------------------------------------------
	// When you reach the page...
	componentWillMount() {
		const { id, teamName, playerName, guess, qHeader, qBody} = this.props;
		this.setState({ id, teamName, playerName, guess, qHeader, qBody});
	}

	//-------------------------------------------------------
	// Handle changes to this control
	handleSubmit(event) {
		// TODO: Disble control
		console.log(event);
		const pass = event.target.innerText === 'Pass';
		//-------------------------------------------------------
		// Pass back controls state values
		this.props.handleSubmit(pass, this.state);
	}

	render() {
		const { id, teamName, playerName, guess, qHeader, qBody } = this.state;
		const rowStyle = id % 2 === 0 ? 'table-primary' : 'table-secondary';
		const header = <div>Team: {teamName}<br />Player: {playerName}<br />Question: [{qHeader}]</div>;
		const ref = `ag_${id}_`;
		return (<tr key={id} ref={ref} className={rowStyle}>
			<td>
				{header}<br />
				<button type="button" className="btn btn-success" onClick={this.handleSubmit}>Pass</button><br />
				<button type="button" className="btn btn-danger" onClick={this.handleSubmit}>Fail</button><br />
			</td>
			<td>{qBody}
				<textarea class="form-control" id="exampleTextarea" rows="10">{guess}</textarea>
			</td>
		</tr>);
	}
}
export default AttemptGear;