import React, { useEffect, useState } from 'react';
import styles from './GridRound.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaXmark } from 'react-icons/fa6';
import FetchAnswer from '../../utils/FetchAnswer';

const cx = classNames.bind(styles);

function GridRound({ round, players }) {
    const [isAnswer, setIsAnswer] = useState([]);
    const [selectedButton, setSelectedButton] = useState(Array(round).fill(null));
    const [isLoading, setIsLoading] = useState(false);

    const handleAnswer = () => {
        FetchAnswer(setIsAnswer);
    };

    useEffect(() => {
        FetchAnswer(setIsAnswer);
    }, [isAnswer]);

    const handleClick = (index, buttonIndex) => {
        setSelectedButton((prev) => prev.map((selectedButton, idx) => (idx === index ? buttonIndex : selectedButton)));
    };

    return (
        <>
            <div className={cx('container')}>
                {Array(round)
                    .fill(0)
                    .map((x, index) => {
                        return (
                            <div className={cx('item')} key={index}>
                                <h3>Round {index + 1}:</h3>
                                <div className={cx('btn')}>
                                    <button
                                        onClick={() => handleClick(index, 0)}
                                        className={cx(selectedButton[index] === 0 && 'clicked')}
                                    >
                                        <AiOutlineCheck /> Yes
                                    </button>
                                    <button
                                        onClick={() => handleClick(index, 1)}
                                        className={cx(selectedButton[index] === 1 && 'clicked')}
                                    >
                                        <FaXmark /> No
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <button className={cx('btn-submit')} onClick={handleAnswer}>
                Submit answer
            </button>
        </>
    );
}

export default GridRound;
