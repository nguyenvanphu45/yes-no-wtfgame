import React, { useState } from 'react';
import styles from './QuestionGrid.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaXmark } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function QuestionGrid({ round, answers, setAnswers, currentPlayer, onClickNext }) {
    const [selectedButton, setSelectedButton] = useState(Array(round).fill(null));

    const convert = selectedButton.map(val => val === 0 ? 'yes' : 'no')

    const handleClick = (index, buttonIndex) => {
        setSelectedButton((prev) => prev.map((selectedButton, idx) => (idx === index ? buttonIndex : selectedButton)));
    };

    const handleAnswer = () => {
        if (selectedButton.some((element) => element === null)) {
            return;
        } else {
            const addAnswer = { id: currentPlayer.id, answer: convert };
            setAnswers([...answers, addAnswer]);
            onClickNext();
            setSelectedButton(Array(round).fill(null));
        }
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

export default QuestionGrid;
