import config from '../config';
import GameLayout from '../layout/GameLayout';
import Home from '../pages/Home';
import Question from '../pages/Question';
import StartPage from '../pages/StartPage';

const publicRoutes = [
    { path: config.home, component: Home },
    { path: config.start, component: StartPage },
    { path: config.question, component: Question, layout: GameLayout },
];

export { publicRoutes };
