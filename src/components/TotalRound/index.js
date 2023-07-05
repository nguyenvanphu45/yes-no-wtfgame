import React, { useState } from 'react'
import styles from './TotalRound.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function TotalRound() {
    const [round, setRound] = useState(0);

    return (
        <div className={cx('round')}>
            <h3>Total round</h3>
            <div className={cx('input')}>
                <input type="number" value={round} onChange={(e) => setRound(Number(e.target.value))}  />
                <button disabled={ !round && true}><Link to="/question" state={{ round }}>Start!</Link></button>
            </div>
        </div>
    );
}

export default TotalRound