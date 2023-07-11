import React, { useState } from 'react';
import styles from './ResultPage.module.scss';
import classNames from 'classnames/bind';
import useLocalStorage from '../../hooks/useLocalStorage';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { calculatePercentage } from '../../utils/calculatePercentage';
import { DataGrid } from '@mui/x-data-grid';

const cx = classNames.bind(styles);

const PLAYERS = [
    { field: 'id', headerName: `No.`, width: 168 },
    { field: 'name', headerName: 'Player', width: 168 },
    { field: 'createdAt', headerName: 'Date', width: 245 },
    { field: 'answer', headerName: 'Answer', width: 168 },
    { field: 'result', headerName: 'Result', width: 168 },
    { field: 'score', headerName: 'Score', width: 168 },
];
const WINNER_PLAYERS = [
    { field: 'name', headerName: 'Summary', width: 168 },
    { field: 'correct', headerName: 'Correct percent', width: 168 },
    { field: 'total', headerName: 'Total score', width: 168 },
];

function ResultPage() {
    const [players] = useLocalStorage('players', []);
    const [answers] = useLocalStorage('answers', []);
    const [search, setSearch] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate();
    const [rows, setRows] = useState(players);
    const percentageCorrect = calculatePercentage(state.compareApi, players);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const searchResults = rows
        .filter((row) => {
            return row.name.toLowerCase().includes(search);
        })
        .map((row, index) => {
            const answer = answers[index].answer;
            const result = state.results;
            const score = answer.reduce((acc, currentValue, index) => {
                if (currentValue === result[index]) {
                    return acc + 1
                } else {
                    return acc
                }
            }, 0);
            return {
                id: index,
                name: row.name,
                createdAt: formatDate(row.createAt, 'L, LT'),
                answer: answer.join(', '),
                result: result.join(', '),
                score: score,
                correct: `${percentageCorrect[row.name]} %`,
                total: `${percentageCorrect[row.name] >= 50 ? '1' : '0'}`,
            };
        });

    const handleEnd = () => {
        localStorage.clear();
        navigate('/');
    };

    const [sortPlayer, setSortPlayer] = useState([
        {
            field: 'id',
            sort: 'asc',
        },
        {
            field: 'name',
            sort: 'asc',
        },
        {
            field: 'createdAt',
            sort: 'asc',
        },
        {
            field: 'score',
            sort: 'asc',
        },
    ]);

    const [sortWinner, setSortWinner] = useState([
        {
            field: 'correct',
            sort: 'asc',
        },
        {
            field: 'total',
            sort: 'asc',
        },
    ]);

    function CustomUnsortedIcon() {
        return <UnfoldMoreIcon />;
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
            <div className={cx('grid-player')}>
                <DataGrid
                    columns={PLAYERS}
                    rows={searchResults}
                    sortModel={sortPlayer}
                    onSortModelChange={(player) => setSortPlayer(player)}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    components={{
                        ColumnSortedAscendingIcon: CustomUnsortedIcon,
                        ColumnSortedDescendingIcon: CustomUnsortedIcon,
                    }}
                    className={cx('data-grid')}
                />
            </div>
            <div className={cx('grid-winner')}>
                <DataGrid
                    columns={WINNER_PLAYERS}
                    rows={searchResults}
                    sortModel={sortWinner}
                    onSortModelChange={(winner) => setSortWinner(winner)}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    components={{
                        ColumnSortedAscendingIcon: CustomUnsortedIcon,
                        ColumnSortedDescendingIcon: CustomUnsortedIcon,
                    }}
                    className={cx('data-grid')}
                />
            </div>

            <div className={cx('hide-player')}>
                <h3>
                    The winner is{' '}
                    {Object.entries(percentageCorrect).map(([player, percentage], index) => {
                        return (
                            Number(percentage) >= 50 && (
                                <span key={player} className={cx(player === players[0].name && 'winner')}>
                                    {player} {players[index.length] ? ', ' : ' '}
                                </span>
                            )
                        );
                    })}
                </h3>
            </div>
            <button className={cx('footer')} onClick={handleEnd}>
                End Game
            </button>
        </div>
    );
}

export default ResultPage;
