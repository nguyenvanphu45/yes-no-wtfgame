import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import AddPlayer from '../../components/AddPlayer';
import ConfirmStart from '../../components/ConfirmStart';
import { playersRemainingSelector } from '../../redux/selectors';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '10px',
    },
    overlay: {
        background: '#8F8E8E91',
    },
};

function StartPage() {
    const [isOpen, setIsOpen] = useState(false);

    const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('reduxState')));

    console.log(players);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {!players || !players.length ? (
                <button onClick={openModal}>Add Player</button>
            ) : (
                <ConfirmStart players={players} setPlayers={setPlayers} onOpen={openModal} />
            )}
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                <AddPlayer setPlayers={setPlayers} onClose={closeModal} />
            </Modal>
        </>
    );
}

export default StartPage;
