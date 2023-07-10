import { getPlayerNameById } from "./getPlayers";

export const calculatePercentage = (data, players) => {
    const percentages = {};

    data.forEach((item) => {
        const player = getPlayerNameById(item.id, players);
        const getPlayer = player.props.children;
        if (getPlayer) {
            const totalCorrect = item.answer.reduce((count, answer) => {
                if (answer === 'Correct') {
                    return count + 1;
                }
                return count;
            }, 0);

            const totalAnswers = item.answer.length;
            const percentage = (totalCorrect / totalAnswers) * 100;

            percentages[getPlayer] = percentage.toFixed(2);
        }
    });

    return percentages;
};
