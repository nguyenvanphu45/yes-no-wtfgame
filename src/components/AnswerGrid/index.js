import React, { useEffect, useState } from 'react';
import styles from './AnswerGrid.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { getPlayerNameById } from '../../utils/getPlayers';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AnwerGrid({ round, answers, players }) {
    const [loading, setLoading] = useState(false);
    const [compareApi, setCompareApi] = useState([]);
    const [results, setResults] = useState([]);
    const [correctIds, setCorrectIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            setLoading(true);
            const responses = await Promise.all([...Array(round)].map(() => fetch('https://yesno.wtf/api')));
            const rs = await Promise.all(responses.map((response) => response.json()));
            setResults(rs.map((d) => d.answer));
            setCompareApi(
                answers.map((ans) => ({
                    id: ans.id,
                    answer: ans.answer.map((x, i) => {
                        return x === rs[i].answer ? 'Correct' : 'Incorrect';
                    }),
                })),
            );
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!compareApi.length) return;
        else {
            const newCorrectIds = [];

            for (let i = 0; i < compareApi[0].answer.length; i++) {
                const ans = [];
                for (let j = 0; j < compareApi.length; j++) {
                    if (compareApi[j].answer[i] === 'Correct') {
                        ans.push(compareApi[j].id);
                    }
                }
                newCorrectIds.push(ans);
            }

            setCorrectIds(newCorrectIds);
        }
    }, [compareApi]);

    const getPlayerWinner = correctIds.map((id, index) => {
        return (
            <p key={index}>
                Winner: <span>{getPlayerNameById(id.toString(), players)}</span>
            </p>
        );
    });

    const handleSummary = () => {
        navigate('/result', { state: { results, compareApi } });
    };

    return (
        <>
            <div className={cx('container')}>
                {!results.length
                    ? Array(round)
                          .fill(0)
                          .map((x, index) => {
                              return (
                                  <div className={cx('item')} key={index}>
                                      <h3>Round {index + 1}:</h3>
                                      <div className={cx('btn')}>
                                          <button></button>
                                      </div>
                                  </div>
                              );
                          })
                    : results.map((result, index) => {
                          return (
                              <div className={cx('item')} key={index}>
                                  <h3>Round {index + 1}:</h3>
                                  <button>
                                      <p>
                                          Result: <span>{result}</span>
                                      </p>
                                      {getPlayerWinner[index]}
                                  </button>
                              </div>
                          );
                      })}
            </div>
            {loading ? (
                <button className={cx('btn-submit')}>
                    <AiOutlineLoading3Quarters /> Loading
                </button>
            ) : (
                <button className={cx('btn-submit', 'summary')} onClick={handleSummary}>
                    Summary
                </button>
            )}
        </>
    );
}

export default AnwerGrid;
