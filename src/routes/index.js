import config from '../config';
import GameLayout from '../layout/GameLayout';
import Home from '../pages/Home';
import QuestionPage from '../pages/QuestionPage';
import ResultPage from '../pages/ResultPage';
import StartPage from '../pages/StartPage';

const publicRoutes = [
    { path: config.home, component: Home },
    { path: config.start, component: StartPage },
    { path: config.question, component: QuestionPage, layout: GameLayout },
    { path: config.result, component: ResultPage, layout: GameLayout },
];

export { publicRoutes };
