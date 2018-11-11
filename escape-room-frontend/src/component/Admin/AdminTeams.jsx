import React from 'react';
import TeamGear from '../Team/TeamGear';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

/* ############################################################################
 * AdminTeams - This component of the Admin screen handles administration of
 * the teams and the players in those teams
 *
 */  
class AdminTeams extends React.Component {
	constructor(props) {
		super(props);
		this.state = { teams: [] };
		//---------------------------------------------------------------------
		// Bind functions to component
		this.getTeams = this.getTeams.bind(this);
		this.timedEvent = this.timedEvent.bind(this);
		this.handlePlayerUpdate = this.handlePlayerUpdate.bind(this);
		this.handlePlayerDelete = this.handlePlayerDelete.bind(this);
		this.handlePlayerDrop = this.handlePlayerDrop.bind(this);
	}

	//---------------------------------------------------------------------
	// When you reach the page...
	componentWillMount() {
		this.getTeams();
	}
	//---------------------------------------------------------------------
	// When you unmount component...
	componentWillUnmount() {
		console.log('Admin Timer clear...');
		clearInterval(this.interval);
	}
	//---------------------------------------------------------------------
	// AFTER component mounted
	componentDidMount() {
		//---------------------------------------------------------------------
		// Start Timer
		console.log('Admin Timer started...');
		this.interval = setInterval(() => this.timedEvent(), 7000);
	}

	//####################
	// WORKER
	//####################
	getTeams() {
		fetch('api/team/all')
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => this.setState({teams: data}))
			.catch( error => console.log(error) );
	}
	timedEvent() {
		console.log('Admin Team Timer run...');
		// this.getTeams();
	}
	/* ############################################################################
	 * Handle Player Update - this method will update the player's name
	 *
	 */  
	handlePlayerUpdate(id, teamId, name ) {
		let postData = {id, teamId, name};
		console.log(postData);

		//---------------------------------------------------------------------
		// Send attempt
		fetch('api/team/player/update', {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify(postData)
		})
			.then(res => ( res.ok ) ? res.json() : {name: 'FAILED TO LOAD'})
			.then(data => {
				//---------------------------------------------------------------------
				// If successfull login, set values and go on
				if( data.msg.toUpperCase() === 'Success'.toUpperCase() ) {
					console.log(`Yay: ${data.msg}`);
					this.getTeams();
				}
				//---------------------------------------------------------------------
				// Otherwise, alert login error
				else {
					alert(data.msg);
				}
			})
			.catch( error => console.log(error) );

	}
	/* ############################################################################
	 * Handle Player Delete - this method will delete the current player
	 *
	 */  
	handlePlayerDelete(playerId) {
		fetch(`api/team/player/delete/${playerId}`)
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => { console.log(data); this.getTeams(); } )
			.catch( error => console.log(error) );

	}

	//-------------------------------------------------------
	// Handle changes to this control
	handlePlayerDrop(playerId, teamId) {
		fetch(`api/team/player/switch/${playerId}/${teamId}`)
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => { console.log(data); this.getTeams(); } )
			.catch( error => console.log(error) );
	}
	//####################
	// CONTROL GENERATORS
	//####################
	genGears (teams) {
		return teams.map( (team) => 
			<div className="col-lg-5" key={team.id}><TeamGear { ...team }
				handlePlayerUpdate={this.handlePlayerUpdate}
				handlePlayerDelete={this.handlePlayerDelete}
				handlePlayerDrop={this.handlePlayerDrop} /></div> );
	}

	render() {
		return (
			<div className="bs-docs-section">
				<div className="row">
					<button type="button" className="btn btn-primary" onClick={(e) => this.getTeams()}>Refresh</button>
				</div>
				<div className="row">
					{this.genGears(this.state.teams)}
				</div>
			</div>);
	}
}
// export default AdminTeams;
export default DragDropContext(HTML5Backend)(AdminTeams);