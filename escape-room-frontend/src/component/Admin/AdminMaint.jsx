import React from 'react';
import TeamSlider from '../Team/TeamSlider';

/* ############################################################################
 * AdminTeams - This component of the Admin screen handles administration of
 * the teams and the players in those teams
 *
 */  
class AdminMaint extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeTeam = this.handleChangeTeam.bind(this);
	}

	//---------------------------------------------------------------------
	// When you reach the page...
	componentWillMount() {
		// do somethingthis.getTeams();
	}

	//####################
	// WORKER
	//####################
	//-------------------------------------------------------
	// Handle changes to this control
	handleChangeTeam(numOfTeams) {
		fetch(`api/team/set/${numOfTeams}`)
			.then(res => ( res.ok ) ? res.json() : [{name: 'FAILED TO LOAD'}])
			.then(data => { console.log(data); this.getTeams(); } )
			.catch( error => console.log(error) );
	}
	//####################
	// CONTROL GENERATORS
	//####################
	render() {
		return (
			<div className="bs-docs-section">
				<div className="row">
					<TeamSlider handleChangeTeam={this.handleChangeTeam} />
				</div>
			</div>);
	}
}
export default AdminMaint;