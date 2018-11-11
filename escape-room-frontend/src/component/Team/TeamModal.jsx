import React from 'react';
import ReactModal from 'react-modal';

// import '../../resources/css/game.css';

// ReactModal.setAppElement('#root');

export const TeamModal = (modalIsOpen, team) => {
	return (<ReactModal 
		isOpen={modalIsOpen}
		contentLabel="Minimal Modal Example"
	><div class={`bg-${team.color}`}><h1>Team {team.teamName} won!!!</h1></div></ReactModal>);
};
