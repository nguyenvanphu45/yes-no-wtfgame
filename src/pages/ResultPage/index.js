import React, { useState } from 'react';
import styles from './ResultPage.module.scss';
import classNames from 'classnames/bind';
import useLocalStorage from '../../hooks/useLocalStorage';
import { TiArrowUnsorted } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { calculatePercentage } from '../../utils/calculatePercentage';

const cx = classNames.bind(styles);

function ResultPage() {
    const [players] = useLocalStorage('players', []);
    const [answers] = useLocalStorage('answers', []);
    const [search, setSearch] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate()

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const searchResults = players.filter((player) => {
        return player.name.toLowerCase().includes(search);
    });

    const percentageCorrect = calculatePercentage(state.compareApi, players);

    const handleEnd = () => {
        localStorage.clear()
        navigate('/');
    }

    return (
        <div className={cx('container')}>
            <p className={cx('tilte')}>Final results</p>
            <input
                className={cx('search')}
                value={search}
                onChange={handleSearch}
                placeholder="Search by player name"
            />
            <table>
                <thead className={cx('title')}>
                    <tr>
                        <th>
                            <span className={cx('icon')}>
                                No. <TiArrowUnsorted />
                            </span>
                        </th>
                        <th>
                            <span className={cx('icon')}>
                                Player <TiArrowUnsorted />
                            </span>
                        </th>
                        <th colSpan="2">
                            <span className={cx('icon')}>
                                Date <TiArrowUnsorted />
                            </span>
                        </th>
                        <th>Answer</th>
                        <th>Result</th>
                        <th>
                            <span className={cx('icon')}>
                                Score <TiArrowUnsorted />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((player, index) => {
                        const answer = answers[index].answer[0];
                        const result = state.results[0];
                        return (
                            <tr key={player.id}>
                                <td className={cx('number')}>{index + 1}</td>
                                <td>{player.name}</td>
                                <td colSpan="2">{formatDate(player.createAt, 'L, LT')}</td>
                                <td>{answer}</td>
                                <td>{result}</td>
                                <td>{answer === result ? 1 : 0}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {!searchResults.length ? (
                ''
            ) : (
                <table className={cx('table-right')}>
                    <thead className={cx('title')}>
                        <tr>
                            <th>Summary</th>
                            <th>
                                <span className={cx('icon')}>
                                    Correct percent <TiArrowUnsorted />
                                </span>
                            </th>
                            <th>
                                <span className={cx('icon')}>
                                    Total score <TiArrowUnsorted />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result) => {
                            return (
                                <tr key={result.id}>
                                    <td className={cx('number')}>{result.name}</td>
                                    <td>{percentageCorrect[result.name]}%</td>
                                    <td>{percentageCorrect[result.name] > 50 ? '1' : '0'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {Object.entries(percentageCorrect).map(([player, percentage]) => {
                return (
                    Number(percentage) > 50 && (
                        <h3 key={player} className={cx(player === players[0].name && 'winner')}>
                            The winner is {player}
                        </h3>
                    )
                );
            })}
            <button className={cx('footer')} onClick={handleEnd}>End Game</button>
        </div>
    );
}

export default ResultPage;
