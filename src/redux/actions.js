export const addPlayer = (data) => {
    return {
        type: 'players/addPlayer',
        payload: data
    }
}

export const removePlayer = ({id}) => {
    return {
        type: 'players/removePlayer',
        id: id
    }
}