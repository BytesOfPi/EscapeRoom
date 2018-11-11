import React from 'react';
class PlayerInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { id: props.id, inputValue: props.inputValue };
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({ inputValue: e.target.value });
	}
	render() {
		return (<input id={`player${this.props.id}`} value={this.state.inputValue} onChange={this.handleChange} />);
	}
}
export default PlayerInput;