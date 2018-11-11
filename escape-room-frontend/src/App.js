import React from 'react';
import ReactModal from 'react-modal';

import { Header, Main } from './component/routes/routes';

import './resources/css/game.css';
import './resources/css/bootstrap.min.css';
import './App.css';

// Attaching Modal component to application
ReactModal.setAppElement('#root');

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<Main />
			</div>
		);
	}
}

export default App;
