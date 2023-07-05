import React from 'react';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({children}) {
    return (
        <div className={cx('container', 'wrapper')}>
            <h1>Yes No WTF Game</h1>
            <p>
                Yes or No is a fun and addicting game, perfect fot playing on your own or with friends or family. This
                game contains hundreds of the best hand picked Yes or No questions. Vote which option you prefer and
                view real time statistics on what option was the most popular.
            </p>
            {children}
        </div>
    );
}

export default DefaultLayout;
