import React from 'react';
import { PropTypes } from 'prop-types'; // ES6
import { DropTarget } from 'react-dnd'; // ES6

const Target = ({ connectDropTarget, highlighted, shape }) => (
	connectDropTarget(
		<div className='card game_gear text-white bg-success' style={{ backgroundColor: highlighted ? 'black' : 'gray' }} >
			<div className="card-header">Target This</div>
			<div className="card-body">
				<h4 className="card-title">ok</h4>
				<div className="card-text">
					<label>Hit Me</label>
				</div>
			</div>
		</div>
	)
);
Target.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	highlighted: PropTypes.bool.isRequired,
	shape: PropTypes.string.isRequired,
};
const target = {
	drop(props) {
		const { shape } = props;
		return ({
			shape,
		});
	}
};
const collect = (connect,  monitor) => ({
	connectDropTarget: connect.dropTarget(),
	highlighted: monitor.canDrop(),
});

export default DropTarget('ITEM', target, collect)(Target);