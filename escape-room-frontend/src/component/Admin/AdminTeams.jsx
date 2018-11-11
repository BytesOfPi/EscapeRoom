import React from 'react';
import TeamGear from '../Team/TeamGear';


class AdminTeams extends React.Component {
	constructor(props) {
		super(props);
		this.state = { teams: [] };
	}

	//####################
	// WORKER
	//####################
	getQuestions() {
		fetch('api/team/all')
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => this.setState({teams: data}))
			.catch( error => console.log(error) );
	}
	timedEvent() {
		console.log('Game Timer run...');
		this.getQuestions();
	}

	//####################
	// CONTROL GENERATORS
	//####################
	genGears (teams) {
		return teams.map( (team) => 
			<div className="col-lg-4" key={team.id}><TeamGear {...team} /></div> );
	}

	render() {
		return (
			<div className="bs-docs-section">
				<div className="row">
					{this.genGears(this.state.teams)}
				</div>
			</div>);
	}
}
export default AdminTeams;