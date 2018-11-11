import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Source from '../../component/Sample/Source';
import Target from '../../component/Sample/Target';

class SampleDND extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drops: [],
		};
		this.handleDrop = this.handleDrop.bind(this);
	}

	handleDrop(color, shape) {
		const { drops } = this.state;
		const nextDrops = [...drops, {
			color,
			shape,
		}];
		this.setState({
			drops: nextDrops,
		});
	}
	render() {
		const { drops } = this.state;
		return (
			<div id="board">
				<h1>I'm here</h1>
				<div id="board__sources">
					<Source color="red" onDrop={this.handleDrop} />
					<Source color="green" onDrop={this.handleDrop} />
					<Source color="blue" onDrop={this.handleDrop} />
				</div>
				<div id="board__targets">
					<Target shape="circle" />
					<Target shape="square" />
				</div>
				<div id="board__drops">
					{drops.map((drop, i) => (
						<div key={i} >color={drop.color} shape={drop.shape}</div>
					))}
				</div>
			</div>
		);
	}
}
export default DragDropContext(HTML5Backend)(SampleDND);