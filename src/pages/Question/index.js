import React, { useState } from 'react';
import styles from './Question.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import GridRound from '../../components/GridRound';

const cx = classNames.bind(styles);

function Question() {
    const location = useLocation();
    const round = location.state.round;
    const players = JSON.parse(localStorage.getItem('reduxState'));

    const [currentPlayer, setCurrentPlayer] = useState(0);

    return (
        <>
            <div className={cx('player')}>
                <h3>
                    Player:
                    {players.map((player, index) => {
                        return (
                            <span key={index}>
                                {player.name}
                                {index < players.length - 1 ? ', ' : ''}
                            </span>
                        );
                    })}
                </h3>
            </div>
            <h2>Plays of: <span>{players[currentPlayer].name}</span></h2>
            <GridRound round={round} players={players} />
        </>
    );
}

export default Question;
