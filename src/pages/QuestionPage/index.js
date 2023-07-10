import React, { useState } from 'react';
import styles from './Question.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import QuestionGrid from '../../components/QuestionGrid';
import AnwerGrid from '../../components/AnswerGrid';
import useLocalStorage from '../../hooks/useLocalStorage';

const cx = classNames.bind(styles);

function QuestionPage() {
    const location = useLocation();
    const round = location.state.round;
    const [players] = useLocalStorage('players', []);

    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [answers, setAnswers] = useLocalStorage('answers', []);

    const handleNextPlayerClick = () => {
        return setCurrentPlayer((prev) => prev + 1);
    };

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
            {currentPlayer < players.length ? (
                <>
                    <h2>
                        Plays of:{' '}
                        <span className={currentPlayer % 2 && cx('plays-of')}>{players[currentPlayer].name}</span>
                    </h2>
                    <QuestionGrid
                        round={round}
                        answers={answers}
                        setAnswers={setAnswers}
                        currentPlayer={players[currentPlayer]}
                        onClickNext={handleNextPlayerClick}
                    />
                </>
            ) : (
                <AnwerGrid round={round} answers={answers} players={players} />
            )}
        </>
    );
}

export default QuestionPage;
