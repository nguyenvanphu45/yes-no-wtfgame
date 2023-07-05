import React from 'react';
import styles from './GameLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function GameLayout({ children }) {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1>Yes No WTF Game</h1>
                <p>Good Luck!</p>
            </div>
            {children}
        </div>
    );
}

export default GameLayout;
