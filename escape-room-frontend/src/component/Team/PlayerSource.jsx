import React from 'react';
import { PropTypes } from 'prop-types'; // ES6
import { DragSource } from 'react-dnd'; // ES6
import { ITEM_PLAYER } from './dndItem';

const PlayerSource = ({ player, connectDragSource, isDragging }) => (
	connectDragSource(
		<span className="badge badge-pill badge-dark" style={{ 
			opacity: isDragging ? 0.25 : 1,
		}}>{player.name}</span>
	)
);
PlayerSource.propTypes = {
	player: PropTypes.string.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
};
const source = {
	beginDrag(props) {
		const { player } = props;
		return ({
			playerId: player.id,
		});
	},
	endDrag(props, monitor) {
		if (!monitor.didDrop()) {
			return;
		}
		const { onDrop } = props;
		const { playerId } = monitor.getItem();
		const { teamId } = monitor.getDropResult();
		onDrop(playerId, teamId);
	},
};
const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});
export default DragSource(ITEM_PLAYER, source, collect)(PlayerSource);