import { createSelector } from 'reselect';

export const searchSelector = (state) => state.search;

export const playerSelector = (state) => state.players;

export const playersRemainingSelector = createSelector(
    playerSelector,
    searchSelector,
    (players, search) => {
        return players.filter((player) => {
            return player.name.toLowerCase().includes(search);
        })
    }
)