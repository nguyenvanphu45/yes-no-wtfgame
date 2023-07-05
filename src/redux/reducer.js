const initState = {
    search: '',
    players: [],
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'players/addPlayer':
            return {
                ...state,
                players: [...state.players, action.payload]
            }

        case 'players/removePlayer':
            return {
                ...state,
                players: state.players.filter((player) => {
                    return player.id !== action.id;
                }),
            };

        default:
            return state;
    }
};

export default rootReducer
