import React from 'react';
import ReactModal from 'react-modal';

// import '../../resources/css/game.css';

// ReactModal.setAppElement('#root');

const TeamModal = (props) => {
	return (<ReactModal
		{...props} 
		contentLabel={`${props.teamName} Team Won`}
	><div ><h1>Team {props.teamName} won!!!</h1></div></ReactModal>);
};
export default TeamModal;