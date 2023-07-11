import React from 'react';
import styles from './ConfirmStart.module.scss';
import classNames from 'classnames/bind';
import { BsFillTrashFill } from 'react-icons/bs';
import TotalRound from '../TotalRound';

const cx = classNames.bind(styles);

function ConfirmStart({ players, setPlayers, onOpen }) {

    const handleRemove = (e, player) => {
        e.preventDefault();
        const removeItem = players.filter(item => item.id !== player);
        setPlayers(removeItem)
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
                <button disabled={players.length >= 2 && true} onClick={onOpen}>Add More Player</button>
            </div>
            <TotalRound />
        </div>
    );
}

export default ConfirmStart;
