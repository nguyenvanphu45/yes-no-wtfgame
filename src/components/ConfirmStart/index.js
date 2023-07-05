import React, { useState } from 'react';
import styles from './ConfirmStart.module.scss';
import classNames from 'classnames/bind';
import { BsFillTrashFill } from 'react-icons/bs';
import TotalRound from '../TotalRound';
import { useDispatch } from 'react-redux';
import { removePlayer } from '../../redux/actions';

const cx = classNames.bind(styles);

function ConfirmStart({ players, setPlayers, onOpen }) {
    const dispatch = useDispatch();

    const handleRemove = (e, player) => {
        e.preventDefault();
        dispatch(removePlayer({ id: player }));
        setPlayers(JSON.parse(localStorage.getItem('reduxState')));
    };

    return (
        <div className={cx('container')}>
            <div className={cx('table')}>
                <table>
                    <thead className={cx('title')}>
                        <tr>
                            <th>No.</th>
                            <th>Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => {
                            return (
                                <tr key={player.id}>
                                    <td className={cx('number')}>
                                        {index + 1}
                                        <BsFillTrashFill
                                            className={cx('icon')}
                                            onClick={(e) => handleRemove(e, player.id)}
                                        />
                                    </td>
                                    <td>{player.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button onClick={onOpen}>Add More Player</button>
            </div>
            <TotalRound />
        </div>
    );
}

export default ConfirmStart;
