import React from 'react';
import { Link } from 'react-router-dom';

import '../../resources/css/game.css';

export const WrappedLink = (props) => {
	return (
		<button type="button" className="btn btn-primary">
			<Link style={{display: 'block', height: '100%'}} {...props} />
		</button>
	);
};

export const TeamOptions = (props) => {
	return props.teams.map(entry => <option value={entry.name}>{entry.name}</option>);
};

// export const TeamSelect = (props) => {
//   return (<select><TeamOptions teams={[{name: 'junk'}]} /></select>)
//   }
export const TeamSelect = (props) => {
	return (<label>hey</label>);
};
// genOptions(teams) {
//   return teams.map(entry => <option value={entry.name}>{entry.name}</option>)
// }
// // genOptions(teams) {
// //     return (<option value="try">try</option>);
// // }
// genSelect() {
//   return (<select>{this.genOptions(this.state.teams)}</select>);
// }