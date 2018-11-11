import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import { WrappedLink } from '../util/controls';
import Login from '../../container/Login/Login';
import Game from '../../container/Game/Game';
import Admin from '../../container/Admin/Admin';
import SampleDND from '../../container/Sample/SampleDND';

import '../../resources/css/w3-theme-deep-purple.css';
import '../../resources/css/w3.css';

//  class="w3-container w3-theme-d4 w3-card"
export const Header = () => (
	<div className="page-header w3-theme-d4">
		<div className="row">
			<div className="col-lg-8 col-md-7 col-sm-6" ><h2>Camel Program Challenge</h2></div>
			{
				// <div className="col-lg-2 col-md-5 col-sm-6" ><WrappedLink to='/' style={{ textDecoration: 'none' }} >Home</WrappedLink></div>
				// <div className="col-lg-2 col-md-5 col-sm-6" ><WrappedLink to='/game' style={{ textDecoration: 'none' }}>Game</WrappedLink></div>
			}
		</div>
	</div>
);

export const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Login}/>
			<Route path='/game' component={Game}/>
			<Route path='/admin' component={Admin}/>
			<Route path='/dnd' component={SampleDND}/>
		</Switch>
	</main>
);