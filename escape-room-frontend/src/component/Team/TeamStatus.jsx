import React from 'react';

import ReactModal from 'react-modal';
// import TeamModal from './TeamModal';
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

// ReactModal.setAppElement('#root');

class TeamStatus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			total: 5,
			teams: [{ teamName: 'Red', correct: 3 }, { teamName: 'Blue', correct: 2 } ],
			winner: {}
		};
		//---------------------------------------------------------------------
		// Link to methods
		this.genBars = this.genBars.bind(this);
		this.getTeamStatus = this.getTeamStatus.bind(this);
		this.timedEvent = this.timedEvent.bind(this);
	}

	//---------------------------------------------------------------------
	// BEFORE you mount the component...
	componentWillMount() {
		// const { total, teams } = this.props.status;
		// this.setState({total, teams});
	}
	//---------------------------------------------------------------------
	// When you unmount component...
	componentWillUnmount() {
		console.log('TeamStatus Timer clear...');
		clearInterval(this.interval);
	}
	//---------------------------------------------------------------------
	// AFTER component mounted
	componentDidMount() {
		this.getTeamStatus();
		console.log('TeamStatus Timer started...');
		this.interval = setInterval(() => this.timedEvent(), 7000);
	}
  
	//####################
	// WORKER
	//####################
	timedEvent() {
		console.log('TeamStatus timer run...');
		//this.setState({ time: Date.now() });
		this.getTeamStatus();
	}
	getTeamStatus() {
		fetch('api/team/status')
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => {
				let winner = data.teams.find( team => { return team.correct === this.state.total;});
				data.winner = (winner === undefined) ? {} : winner;
				this.setState(data);
			})
			.catch( error => console.log(error) );
	}
	//####################
	// CONTROL GENERATORS
	//####################
	genBars(teams, total) {
		return teams.map(entry => {
			//const modal = (entry.correct === total) ? <TeamModal isOpen='true' team={entry}/> : <div />;
			const percent = `${(entry.correct/total)*100}%`;
			const tLabel = `${entry.teamName}: ${percent}`;
			return (
				<div className="row">
					<div className="col-lg-2">{tLabel}</div>
					<div className="col-lg-7" >
						<div className="progress"> 
							<div className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow={entry.correct} aria-valuemin="0" aria-valuemax={total} style={{width: percent}}></div>
						</div>
					</div>
				</div>);
		});
	}

	render() {
		const modalIsOpen = this.state.winner.teamName !== undefined;
		const {color, teamName} = this.state.winner;
		const classModal = `Modal bg-${color}`;
		const classOverlay = 'Overlay bg-grey';
		return (<div className="bs-docs-section">
			<ReactModal 
				isOpen={modalIsOpen}
				contentLabel="Team Won" 
				className={classModal}
				overlayClassName={classOverlay}><div ><h1>Team {teamName} won!!!</h1></div></ReactModal>
			{this.genBars(this.state.teams, this.state.total)}</div>);
		//<ReactModal 
		//	isOpen={modalIsOpen}
		//	contentLabel="Minimal Modal Example"
		//><div class={`bg-${color}`}><h1>Team {teamName} won!!!</h1></div></ReactModal>
	}
}

export default TeamStatus;