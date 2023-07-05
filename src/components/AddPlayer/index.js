import React, { useState } from 'react';
import styles from './AddPlayer.module.scss';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { addPlayer } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

function AddPlayer({ setPlayers, onClose }) {
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;
        else {
            dispatch(
                addPlayer({
                    id: uuidv4(),
                    name: name,
                    result: [],
                    createdAt: new Date(),
                }),
            );
            setPlayers(JSON.parse(localStorage.getItem('reduxState')));
            setName('');
            onClose();
        }
    };

    return (
        <div className={cx('container')}>
            <h3>Please enter a new name</h3>
            <form onSubmit={handleSubmit}>
                <p>New name: </p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <div className={cx('btn')}>
                    <button>Ok</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddPlayer;
