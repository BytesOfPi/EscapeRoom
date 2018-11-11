import React from 'react';
import uuid from 'uuid/v1';
import PlayerInput from './PlayerInput';
import PlayerSource from './PlayerSource';
import TeamTarget from './TeamTarget';

class TeamGear extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		//-------------------------------------------------------
		// Bind methods to this object
		this.handlePlayerUpdate = this.handlePlayerUpdate.bind(this);
		this.handlePlayerDelete = this.handlePlayerDelete.bind(this);
		this.handlePlayerDrop = this.handlePlayerDrop.bind(this);
	}

	//-------------------------------------------------------
	// Handle changes to this control
	handlePlayerUpdate(playerId) {
		// TODO
		const name = document.getElementById(`player${playerId}`).value;
		const teamId = this.props.id;

		console.log(`Update player [${playerId}]`);
		this.props.handlePlayerUpdate( playerId, teamId, name );
	}

	//-------------------------------------------------------
	// Handle changes to this control
	handlePlayerDelete(playerId) {
		//-------------------------------------------------------
		// Pass back controls state values
		this.props.handlePlayerDelete( playerId );
	}

	//-------------------------------------------------------
	// Handle changes to this control
	handlePlayerDrop(playerId, teamId) {
		//-------------------------------------------------------
		// Log the change
		console.log(`Player ${playerId} dropped on team ${teamId}`);
		//-------------------------------------------------------
		// Let parent handle the DND
		this.props.handlePlayerDrop( playerId, teamId );
	}

	genTeamMembers(players) {
		return players.map( player => <tr >
			{
			// <th scope="row"><input type='text' id={`player${player.id}`} value={player.name} /></th>
			// <th scope="row"><PlayerInput id={player.id} inputValue={player.name} /></th>
			}
			<th scope="row"><PlayerInput id={player.id} inputValue={player.name} />
				<PlayerSource player={{ id: player.id, name: player.name }} onDrop={this.handlePlayerDrop}/></th>
			<td><button type="button" className="btn btn-primary" onClick={(e) => this.handlePlayerUpdate(player.id, e)}>Update</button></td>
			<td><button type="button" className="btn btn-danger" onClick={(e) => this.handlePlayerDelete(player.id, e)}>Delete</button></td>
		</tr>);
	}

	render() {        
		const gearClass = `card game_gear bg-${this.props.color}`;

		return (<div className={gearClass} key={uuid()}>
			<div className="card-header">{this.props.name} Team</div>
			<div className="card-body">
				<h4 className="card-title">Modify {this.props.name}</h4>
				<div className="card-text">
					<TeamTarget team={{ id: this.props.id, name: this.props.name }} />
					<table class="table table-hover">
						<col width="60%" />
						<col width="20%" />
						<col width="20%" />
						<thead>
							<tr>
								<th scope="col" width>Player</th>
								<th scope="col">&nbsp;</th>
								<th scope="col">&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{this.genTeamMembers(this.props.players)}
						</tbody>
					</table>
				</div>
			</div>
		</div>);
	}
}
export default TeamGear;