import React from 'react';
import { Redirect } from 'react-router-dom';

import questions from '../../resources/json/questions.json';
import GameGear from '../../component/GameGear/GameGear';
import TeamStatus from '../../component/Team/TeamStatus';

class Game extends React.Component {
	constructor( props ) {
		super(props);

		const prev = ( props.history.location !== undefined && props.history.location.props !== undefined) ? 
			props.history.location.props : { player: 'NO-ONE', team: 'NO-TEAM'};
		const { playerId, playerName, teamId, teamName } = prev;
		this.state = {
			playerId, playerName, teamId, teamName,
			teamStatus: {
				total: 5,
				teams: [{ teamName: 'Orange', correct: 4 }, { teamName: 'Tan', correct: 1 } ]
			},
			questions: questions,
			rejected: false
		};
		//---------------------------------------------------------------------
		// Bind functions to this component
		this.genGears = this.genGears.bind(this);
		this.getQuestions = this.getQuestions.bind(this);
		this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
	}
	//---------------------------------------------------------------------
	// When you reach the page...
	componentWillMount() {
		this.getQuestions();
		this.getPlayer();
	}
	//---------------------------------------------------------------------
	// When you unmount component...
	componentWillUnmount() {
		console.log('Game Timer clear...');
		clearInterval(this.interval);
	}
	//---------------------------------------------------------------------
	// AFTER component mounted
	componentDidMount() {
		//---------------------------------------------------------------------
		// Start Timer
		console.log('Game Timer started...');
		this.interval = setInterval(() => this.timedEvent(), 7000);
	}

	//####################
	// WORKER
	//####################
	getPlayer() {
		const {playerId, playerName, teamId, teamName} = this.state;
		fetch(`api/team/player/get/${playerId}`)
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => {
				if (data === undefined || data.id === 0 ) {
					this.setState({rejected: true});
				}
				else if ( data.teamId !== teamId || data.name !== playerName || data.teamName !== teamName ) {
					this.setState({teamId: data.teamId, teamName: data.teamName, playerName: data.name });
				}
			})
			.catch( error => console.log(error) );
		
	}
	getQuestions() {
		fetch('api/game/questions')
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => this.setState({questions: data}))
			.catch( error => console.log(error) );
	}
	timedEvent() {
		console.log('Game Timer run...');
		this.getQuestions();
		this.getPlayer();
	}

	//####################
	// CONTROL HANDLERS
	//####################
	//---------------------------------------------------------------------
	// Submitting a question
	handleQuestionSubmit(gearState) {
		//---------------------------------------------------------------------
		// Build Attempt
		const {playerId, playerName, teamId, teamName} = this.state;
		const attempt = {
			playerId, playerName, teamId, teamName,
			questionId: gearState.id,
			guess: gearState.taValue,
			status: 'I'
		};
		console.log(`${gearState.id}: ${gearState.taValue}`);
        
		//---------------------------------------------------------------------
		// Send attempt
		fetch('api/attempt/add', {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify(attempt)
		})
			.then(res => ( res.ok ) ? res.json() : {name: 'FAILED TO LOAD'})
			.then(data => {
				//---------------------------------------------------------------------
				// If successfull login, set values and go on
				if( data.msg.toUpperCase() === 'Success'.toUpperCase() ) {
					console.log(`Yay: ${data.msg}`);
				}
				//---------------------------------------------------------------------
				// Otherwise, alert login error
				else {
					alert(data.msg);
				}
			})
			.catch( error => console.log(error) );

	}

	//####################
	// CONTROL GENERATORS
	//####################
	genGears (questions) {
		return questions.map( (question) => 
			<div className="col-lg-4" key={question.id}><GameGear {...question} teamId={this.state.teamId} handleSubmit={this.handleQuestionSubmit}/></div> );
	}

	render() {
		if (this.state.rejected) {
			console.log('You\'ve been kicked!');
			return (<Redirect
				to={{
					pathname: '/'
				}} />);
		}
		return (
			<div className="bs-docs-section">
				<div className="row"><div className="page-header"><h2>Game Page</h2></div></div>
				<div className="row"><div className="col-sm-10"><TeamStatus status={this.state.teamStatus}/></div></div>
				<div className="row">
					<div className="col-lg-2">Player: {this.state.playerName}</div><div className="col-lg-2">Team: {this.state.teamName}</div>
				</div>
				<div className="row">
					{this.genGears(this.state.questions)}
				</div>
			</div>
		);
	}
}
export default Game;