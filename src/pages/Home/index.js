import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <button>
                <Link to="/start">Start Game</Link>
            </button>
        </div>
    );
}

export default Home;
