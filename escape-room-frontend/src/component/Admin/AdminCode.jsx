import React from 'react';

import questions from '../../resources/json/questions.json';
import AttemptGear from '../AttemptGear/AttemptGear';

class AdminCode extends React.Component {
	constructor( props ) {
		super(props);this.state = {
			teamStatus: {
				total: 5,
				teams: [{ teamName: 'Orange', correct: 4 }, { teamName: 'Tan', correct: 1 } ]
			},
			questions: questions,
			attempts: []
		};
		//---------------------------------------------------------------------
		// Bind functions to this component
		this.genGears = this.genGears.bind(this);
		this.getQuestions = this.getQuestions.bind(this);
		this.getAttempts = this.getAttempts.bind(this);
		this.timedEvent = this.timedEvent.bind(this);
		this.getQuestion = this.getQuestion.bind(this);
        
	}
	//---------------------------------------------------------------------
	// When you reach the page...
	componentWillMount() {
		this.getAttempts();
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
		// Load questions
		this.getQuestions();
		//---------------------------------------------------------------------
		// Start Timer
		console.log('Admin Timer started...');
		this.interval = setInterval(() => this.timedEvent(), 7000);
	}

	//####################
	// CONTROL HANDLERS
	//####################
	//---------------------------------------------------------------------
	// Submitting a question
	handleStatusChangeSubmit(pass, control) {
		const url = `api/attempt/update/${control.id}/${pass?'S':'F'}`;

		fetch(url)
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => console.log(data))
			.catch( error => console.log(error) );
	}
	//####################
	// WORKER
	//####################
	getAttempt( findId ) {
		const q = this.state.attempts.find( obj => obj.id === findId );
		return (q === undefined) ? {} : q;
	}
	getQuestion( findId ) {
		const q = this.state.questions.find( obj => obj.id === findId );
		return (q === undefined) ? {} : q;
	}
	timedEvent() {
		console.log('Admin Timer run...');
		this.getAttempts();
	}
	getQuestions() {
		fetch('api/game/questions')
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => this.setState({questions: data}))
			.catch( error => console.log(error) );
	}
	getAttempts() {
		fetch('api/attempt/status')
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => { 
				this.setState({attempts: data});
			})
			.catch( error => console.log(error) );
	}

	//####################
	// CONTROL GENERATORS
	//####################
	genGears(attempts) {
		return attempts.map( (attempt) => {
			const { id, teamName, playerName, status, guess } = attempt;
			if( status !== 'I' ) return(<div></div>);
      
			const q = this.getQuestion(attempt.questionId);
			if( q === undefined || q.header === undefined ) return(<div></div>);
			const modAtt = { id, teamName, playerName, status, guess, qHeader: q.header, qBody: `${q.title}: ${q.text}` };
			return (<AttemptGear {...modAtt} handleSubmit={this.handleStatusChangeSubmit}/>); });
	}

	render() {
		return (
			<table class="table table-hover">
				<col width="10%" />
				<col width="90%" />
				<thead>
					<tr>
						<th scope="col" width>Info</th>
						<th scope="col">Guess</th>
					</tr>
				</thead>
				<tbody>
					{this.genGears(this.state.attempts)}
				</tbody>
			</table>
		);
	}
}
export default AdminCode;