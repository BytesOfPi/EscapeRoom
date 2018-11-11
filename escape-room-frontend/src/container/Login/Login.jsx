import React from 'react';
import { Redirect } from 'react-router-dom';
//import TeamSelect from '../../component/util/controls'

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [{}],
			adminPath: false,
			playGame: false
		};
		//---------------------------------------------------------------------
		// Bind methods to this component
		this.genSelect = this.genSelect.bind(this);
		this.genOptions = this.genOptions.bind(this);
		this.loadTeams = this.loadTeams.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}
	//---------------------------------------------------------------------
	// When you reach the page...
	componentWillMount() {
		this.loadTeams();
	}
	//---------------------------------------------------------------------
	// Load teams from backend
	loadTeams() {
		fetch('api/team/all')
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => this.setState({teams: data}))
			.catch( error => console.log(error) );
	}
	//---------------------------------------------------------------------
	// Generate team dropdown
	genOptions(teams) {
		return teams.map(entry => <option value={entry.name}>{entry.name}</option>);
	}
	genSelect() {
		return (<select class="form-control" id="team" ref="team">{this.genOptions(this.state.teams)}</select>);
	}
	onKeyPress(e) {
		if(e.key === 'Enter'){
			this.handleLogin();
		}
	}
	//---------------------------------------------------------------------
	// Handle login button
	handleLogin() {
		//---------------------------------------------------------------------
		// Build Attempt
		const attempt = {
			player: this.refs.player.value.trim() // ,
			//team: this.refs.team.value,
			//creds: this.refs.creds.value.trim()
		};
		console.log(attempt);

		//---------------------------------------------------------------------
		// Backend Login attempt
		// fetch('api/game/login', {
		fetch('api/game/loginRandom', {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify(attempt)
		})
			.then(res => ( res.ok ) ? res.json() : {msg: 'FAILED TO LOAD'})
			.then(data => {
				//---------------------------------------------------------------------
				// If successfull login, set values and go on
				if( data.msg.toUpperCase() === 'SuccessAdmin'.toUpperCase() ) {
					this.setState({ adminPath: true });
				}
				else if( data.msg.toUpperCase() === 'Success'.toUpperCase() ) {
					this.setState({ playerId: data.player.id,
						playerName: attempt.player,
						teamId: data.player.teamId,
						teamName: attempt.team,
						playGame: true });
				}
				//---------------------------------------------------------------------
				// Otherwise, alert login error
				else {
					alert(data.msg);
				}
			})
			.catch( error => console.log(error) );
	}

	//---------------------------------------------------------------------
	// Display output
	render() {
		if( this.state.adminPath ) {
			return (<Redirect
				to={{
					pathname: '/admin'
					// pathname: '/dnd'
				}} />);
		}
		if( this.state.playGame ) {
			const {playerId, playerName, teamId, teamName} = this.state;

			return (<Redirect
				to={{
					pathname: '/game',
					props: {playerId, playerName, teamId, teamName}
				}} />);
		}
		return (<div className="bs-docs-section">
			<div class="col-lg-6">
				{/*
				<div class="form-group row">
                    Team: {this.genSelect()}
				</div>
				<div class="form-group row">
                    Team Password: <input type="password" class="form-control" id="creds" ref="creds" maxlength="50" placeholder="Password" onKeyPress={this.onKeyPress}></input>
				</div>
				*/ }
				<div class="form-group row">
                    Name: <input type="text" class="form-control" id="player" ref="player" maxlength="50" placeholder="Enter your name" onKeyPress={this.onKeyPress}/><br />
				</div>
				<div class="form-group row">
					<button type="button" className="btn btn-primary" onClick={this.handleLogin} >Submit</button>
				</div>
			</div>
		</div>);
	}
}
export default Login;