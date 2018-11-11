import React from 'react';
import Slider from 'rc-slider';
const SliderTooltip = Slider.createSliderWithTooltip(Slider);

const marks = {
	2: <strong>2 Teams</strong>,
	3: '3',
	4: '4',
	5: '5',
	6: {
		style: {
			color: 'red',
		},
		label: <strong>6 Teams</strong>,
	},
};
class TeamSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: [20, 40, 60, 80],
		};
		this.onSliderChange = this.onSliderChange.bind(this);
		this.handleChangeTeam = this.handleChangeTeam.bind(this);
	}

	onSliderChange(value) {
		this.setState({ value });
	}
	handleChangeTeam() {
		this.props.handleChangeTeam(this.state.value);
	}

	render() {
		const wrapperStyle = { width: 400, margin: 50 };
		return (
			<div>
				<div style={wrapperStyle}>
					<p><h4>Select # of teams</h4>
						<button type="button" className="btn btn-success" onClick={this.handleChangeTeam}>Change</button></p>
					<SliderTooltip dots marks={marks} min={2} max={6} defaultValue={3} onChange={this.onSliderChange} />
				</div>
			</div>
		);
	}
}
export default TeamSlider;