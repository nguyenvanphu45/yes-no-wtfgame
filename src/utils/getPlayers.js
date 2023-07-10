export const getPlayerNameById = (id, players) => {
    const player = players.find((player) => {
        return player.id === id;
    });
    return player ? (
        <span style={{ color: players.indexOf(player) === 0 ? 'red' : 'green' }}>{player.name}</span>
    ) : null;
};
