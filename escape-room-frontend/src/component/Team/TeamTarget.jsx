import React from 'react';
import { PropTypes } from 'prop-types'; // ES6
import { DropTarget } from 'react-dnd'; // ES6
import { ITEM_PLAYER } from './dndItem';

const TeamTarget = ({ connectDropTarget, highlighted, team }) => (
	connectDropTarget(
		<span className="badge badge-pill badge-secondary" >{team.name}</span>
	)
);
TeamTarget.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	highlighted: PropTypes.bool.isRequired,
	shape: PropTypes.string.isRequired,
};
const target = {
	drop(props) {
		const { team } = props;
		return ({
			teamId: team.id,
		});
	}
};
const collect = (connect,  monitor) => ({
	connectDropTarget: connect.dropTarget(),
	highlighted: monitor.canDrop(),
});

export default DropTarget(ITEM_PLAYER, target, collect)(TeamTarget);